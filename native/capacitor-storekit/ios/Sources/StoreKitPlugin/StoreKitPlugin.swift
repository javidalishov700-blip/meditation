import Foundation
import Capacitor
import StoreKit

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
        CAPPluginMethod(name: "getEntitlement", returnType: CAPPluginReturnPromise)
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
                call.resolve(["products": products.map(Self.serialize)])
            } catch {
                call.reject("Failed to load products", nil, error)
            }
        }
    }

    @objc func purchase(_ call: CAPPluginCall) {
        guard let productId = call.getString("productId") else {
            call.reject("productId is required")
            return
        }
        Task {
            do {
                let products = try await Product.products(for: [productId])
                guard let product = products.first else {
                    call.resolve(["status": "unavailable"])
                    return
                }
                let result = try await product.purchase()
                switch result {
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
                    call.resolve(["status": "unavailable"])
                }
            } catch {
                call.reject("Purchase failed", nil, error)
            }
        }
    }

    @objc func restorePurchases(_ call: CAPPluginCall) {
        Task {
            do {
                try await AppStore.sync()
                call.resolve(await Self.currentEntitlement())
            } catch {
                call.reject("Restore failed", nil, error)
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
