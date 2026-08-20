import Foundation
import Capacitor
import StoreKit
import UIKit

enum StoreKitPluginError: Error {
    case failedVerification
}

/// Native Apple StoreKit 2 bridge. No third-party purchase SDK — receipts are
/// verified on-device via StoreKit's own JWS verification and transactions are
/// read straight from `Transaction.currentEntitlements`.
@objc(StoreKitPlugin)
public class StoreKitPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "StoreKitPlugin"
    public let jsName = "StoreKitNative"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "getProducts", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "purchase", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "restorePurchases", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getEntitlement", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getStorefront", returnType: CAPPluginReturnPromise)
    ]

    private var updateListenerTask: Task<Void, Never>?

    override public func load() {
        updateListenerTask = listenForTransactionUpdates()
    }

    deinit {
        updateListenerTask?.cancel()
    }

    @objc func getProducts(_ call: CAPPluginCall) {
        guard let ids = call.getArray("productIds", String.self), !ids.isEmpty else {
            call.reject("productIds is required")
            return
        }
        Task {
            do {
                let products = try await Product.products(for: ids)
                call.resolve([
                    "products": products.map(Self.serialize),
                    // Zero products with no error means App Store Connect has not made
                    // these ids available yet — worth telling the caller apart from a
                    // network failure.
                    "requested": ids.count
                ])
            } catch {
                call.reject("Failed to load products: \(error.localizedDescription)", nil, error)
            }
        }
    }

    /// Which App Store this device is actually talking to. Asked separately from the
    /// catalogue because the two fail differently: a product lookup that never answers
    /// looks the same whether Apple has no such product or StoreKit cannot resolve a
    /// store at all. `Storefront.current` needs no product ids and no App Store Connect
    /// state — it only needs a signed-in Media & Purchases account and a route to Apple.
    /// A country code back means the pipe is open and the catalogue is the problem;
    /// nothing back means the device never reached the store in the first place.
    @objc func getStorefront(_ call: CAPPluginCall) {
        Task {
            let storefront = await Storefront.current
            var data: [String: Any] = ["available": storefront != nil]
            if let storefront {
                data["countryCode"] = storefront.countryCode
                data["id"] = storefront.id
            }
            call.resolve(data)
        }
    }

    /// Capacitor hands plugin calls to a background queue. StoreKit's purchase sheet
    /// is UI: asked for from off the main actor it can never find a window scene to
    /// present in, so the call would hang and the JS promise would never settle —
    /// leaving the buy button spinning forever. Everything here runs on the main actor,
    /// and every path ends in exactly one resolve or reject.
    @objc func purchase(_ call: CAPPluginCall) {
        guard let productId = call.getString("productId") else {
            call.reject("productId is required")
            return
        }
        Task { @MainActor in
            do {
                let products = try await Product.products(for: [productId])
                guard let product = products.first else {
                    call.resolve(["status": "unavailable", "reason": "product_not_found"])
                    return
                }
                switch try await Self.presentPurchase(product) {
                case .success(let verification):
                    let transaction = try Self.checkVerified(verification)
                    await transaction.finish()
                    call.resolve([
                        "status": "purchased",
                        "transaction": Self.serializeTransaction(transaction)
                    ])
                case .userCancelled:
                    call.resolve(["status": "cancelled"])
                case .pending:
                    call.resolve(["status": "pending"])
                @unknown default:
                    call.resolve(["status": "unavailable", "reason": "unknown_result"])
                }
            } catch {
                call.reject("Purchase failed: \(error.localizedDescription)", nil, error)
            }
        }
    }

    /// iOS 17 wants the scene to confirm in; older systems infer the key window.
    @MainActor
    private static func presentPurchase(_ product: Product) async throws -> Product.PurchaseResult {
        if #available(iOS 17.0, *), let scene = activeWindowScene() {
            return try await product.purchase(confirmIn: scene)
        }
        return try await product.purchase()
    }

    @MainActor
    private static func activeWindowScene() -> UIWindowScene? {
        let scenes = UIApplication.shared.connectedScenes.compactMap { $0 as? UIWindowScene }
        return scenes.first { $0.activationState == .foregroundActive } ?? scenes.first
    }

    /// AppStore.sync() can put up a sign-in sheet, so it needs the main actor too.
    @objc func restorePurchases(_ call: CAPPluginCall) {
        Task { @MainActor in
            do {
                try await AppStore.sync()
                call.resolve(await Self.currentEntitlement())
            } catch {
                // A cancelled sign-in is not a failure: report what is on file instead
                // of rejecting, so the caller still gets a usable answer.
                call.resolve(await Self.currentEntitlement())
            }
        }
    }

    @objc func getEntitlement(_ call: CAPPluginCall) {
        Task {
            call.resolve(await Self.currentEntitlement())
        }
    }

    private func listenForTransactionUpdates() -> Task<Void, Never> {
        Task.detached { [weak self] in
            for await update in Transaction.updates {
                guard let transaction = try? Self.checkVerified(update) else { continue }
                await transaction.finish()
                let entitlement = await Self.currentEntitlement()
                await MainActor.run {
                    self?.notifyListeners("entitlementUpdate", data: entitlement)
                }
            }
        }
    }

    private static func checkVerified<T>(_ result: VerificationResult<T>) throws -> T {
        switch result {
        case .unverified:
            throw StoreKitPluginError.failedVerification
        case .verified(let safe):
            return safe
        }
    }

    private static func currentEntitlement() async -> [String: Any] {
        var active = false
        var productId: String?
        var expiresAt: Double?
        for await result in Transaction.currentEntitlements {
            guard let transaction = try? checkVerified(result) else { continue }
            if transaction.revocationDate != nil { continue }
            if let expirationDate = transaction.expirationDate, expirationDate < Date() { continue }
            active = true
            productId = transaction.productID
            expiresAt = transaction.expirationDate?.timeIntervalSince1970
        }
        var data: [String: Any] = ["active": active]
        if let productId { data["productId"] = productId }
        if let expiresAt { data["expiresAt"] = expiresAt }
        return data
    }

    private static func serialize(_ product: Product) -> [String: Any] {
        var data: [String: Any] = [
            "id": product.id,
            "displayName": product.displayName,
            "description": product.description,
            "priceString": product.displayPrice,
            "price": NSDecimalNumber(decimal: product.price).doubleValue,
            "currencyCode": product.priceFormatStyle.currencyCode
        ]
        if let period = Self.periodString(product.subscription?.subscriptionPeriod) {
            data["subscriptionPeriod"] = period
        }
        return data
    }

    private static func periodString(_ period: Product.SubscriptionPeriod?) -> String? {
        guard let period else { return nil }
        switch period.unit {
        case .day: return "P\(period.value)D"
        case .week: return "P\(period.value)W"
        case .month: return "P\(period.value)M"
        case .year: return "P\(period.value)Y"
        @unknown default: return nil
        }
    }

    private static func serializeTransaction(_ transaction: Transaction) -> [String: Any] {
        var data: [String: Any] = [
            "productId": transaction.productID,
            "purchaseDate": transaction.purchaseDate.timeIntervalSince1970
        ]
        if let expiresAt = transaction.expirationDate?.timeIntervalSince1970 {
            data["expiresAt"] = expiresAt
        }
        return data
    }
}
