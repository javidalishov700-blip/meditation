/**
 * After `npx cap add/sync ios` (Codemagic generates the Xcode project).
 *
 * Apple Developer / App Store Connect (do this in the portals, never paste keys here):
 * 1. Identifiers → App ID `app.steady.calm` → enable In-App Purchase
 * 2. App Store Connect → new iOS app, bundle `app.steady.calm`, SKU `steady-calm`
 * 3. Agreements → Paid Apps + banking/tax before IAP goes live
 * 4. Subscription group "Steady Pro" + product ids in store/app-store-products.json
 * 5. Codemagic → Apple Developer Portal integration (App Store Connect API key)
 * 6. Purchases are native StoreKit 2 (native/capacitor-storekit) — no purchase SDK key needed
 * 7. Public https origin for /legal/privacy.html and /legal/terms.html (repo is private)
 */
import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'

const langs = ['tr', 'az', 'en', 'ru', 'es', 'it']
const root = process.cwd()
const notifyCopy = {
  tr: 'Günlük seans, uyku saati ve deneme bitişi için bu telefonda hatırlatma göndermek için.',
  az: 'Gündəlik seans, yatış saatı və sınaq bitişi üçün bu telefondan xatırlatma göndərmək üçün.',
  en: 'To send reminders on this phone for your daily session, bedtime, and the end of the trial.',
  ru: 'Чтобы напоминать на этом телефоне о ежедневном сеансе, часе сна и конце пробного периода.',
  es: 'Para enviar en este teléfono recordatorios de la sesión del día, la hora de dormir y el fin de la prueba.',
  it: 'Per inviare su questo telefono promemoria della sessione del giorno, dell’ora di nanna e della fine della prova.',
}

function insertBeforePlistEnd(xml, block) {
  const needle = '</dict>\n</plist>'
  if (!xml.includes(needle)) return xml.replace('</dict>\r\n</plist>', `${block}</dict>\r\n</plist>`)
  return xml.replace(needle, `${block}</dict>\n</plist>`)
}

function setPlistString(xml, key, value) {
  const re = new RegExp(`<key>${key}</key>\\s*<string>[^<]*</string>`)
  const repl = `<key>${key}</key>\n\t<string>${value}</string>`
  if (re.test(xml)) return xml.replace(re, repl)
  return insertBeforePlistEnd(xml, `\t${repl}\n`)
}

function setPlistBool(xml, key, value) {
  const re = new RegExp(`<key>${key}</key>\\s*<(true|false)/>`)
  const repl = `<key>${key}</key>\n\t<${value ? 'true' : 'false'}/>`
  if (re.test(xml)) return xml.replace(re, repl)
  return insertBeforePlistEnd(xml, `\t${repl}\n`)
}

function setPlistStringArray(xml, key, values) {
  const re = new RegExp(`<key>${key}</key>\\s*<array>[\\s\\S]*?</array>`)
  const inner = values.map((v) => `\t\t<string>${v}</string>`).join('\n')
  const block = `<key>${key}</key>\n\t<array>\n${inner}\n\t</array>`
  if (re.test(xml)) return xml.replace(re, block)
  return insertBeforePlistEnd(xml, `\t${block}\n`)
}

function xcodeId() {
  return crypto.randomBytes(12).toString('hex').toUpperCase()
}

function addResourceFile(pbx, fileName, fileRefComment = fileName) {
  if (pbx.includes(`path = ${fileName};`)) return pbx
  const fileRef = xcodeId()
  const buildFile = xcodeId()
  pbx = pbx.replace(
    '/* Begin PBXBuildFile section */\n',
    `/* Begin PBXBuildFile section */\n\t\t${buildFile} /* ${fileRefComment} in Resources */ = {isa = PBXBuildFile; fileRef = ${fileRef} /* ${fileRefComment} */; };\n`,
  )
  pbx = pbx.replace(
    '/* Begin PBXFileReference section */\n',
    `/* Begin PBXFileReference section */\n\t\t${fileRef} /* ${fileRefComment} */ = {isa = PBXFileReference; lastKnownFileType = text.xml; path = ${fileName}; sourceTree = "<group>"; };\n`,
  )
  pbx = pbx.replace(
    '/* Info.plist */,\n',
    `/* Info.plist */,\n\t\t\t\t${fileRef} /* ${fileRefComment} */,\n`,
  )
  pbx = pbx.replace(
    '/* config.xml in Resources */,\n',
    `/* config.xml in Resources */,\n\t\t\t\t${buildFile} /* ${fileRefComment} in Resources */,\n`,
  )
  return pbx
}

function addInfoPlistStrings(pbx) {
  if (pbx.includes('InfoPlist.strings')) return pbx
  const variantId = xcodeId()
  const buildId = xcodeId()
  const localeIds = Object.fromEntries(langs.map((l) => [l, xcodeId()]))
  const fileRefs = langs
    .map(
      (l) =>
        `\t\t${localeIds[l]} /* ${l} */ = {isa = PBXFileReference; lastKnownFileType = text.plist.strings; name = ${l}; path = ${l}.lproj/InfoPlist.strings; sourceTree = "<group>"; };`,
    )
    .join('\n')
  const children = langs.map((l) => `\t\t\t\t${localeIds[l]} /* ${l} */,`).join('\n')
  pbx = pbx.replace(
    '/* Begin PBXBuildFile section */\n',
    `/* Begin PBXBuildFile section */\n\t\t${buildId} /* InfoPlist.strings in Resources */ = {isa = PBXBuildFile; fileRef = ${variantId} /* InfoPlist.strings */; };\n`,
  )
  pbx = pbx.replace('/* Begin PBXFileReference section */\n', `/* Begin PBXFileReference section */\n${fileRefs}\n`)
  pbx = pbx.replace(
    '/* Info.plist */,\n',
    `/* Info.plist */,\n\t\t\t\t${variantId} /* InfoPlist.strings */,\n`,
  )
  pbx = pbx.replace(
    '/* config.xml in Resources */,\n',
    `/* config.xml in Resources */,\n\t\t\t\t${buildId} /* InfoPlist.strings in Resources */,\n`,
  )
  const variant = `/* Begin PBXVariantGroup section */\n\t\t${variantId} /* InfoPlist.strings */ = {\n\t\t\tisa = PBXVariantGroup;\n\t\t\tchildren = (\n${children}\n\t\t\t);\n\t\t\tname = InfoPlist.strings;\n\t\t\tsourceTree = "<group>";\n\t\t};\n`
  if (pbx.includes('/* Begin PBXVariantGroup section */\n')) {
    pbx = pbx.replace('/* Begin PBXVariantGroup section */\n', variant)
  } else {
    pbx = pbx.replace('/* Begin XCBuildConfiguration section */', `${variant}\n/* Begin XCBuildConfiguration section */`)
  }
  return pbx
}

function patchPbxproj(pbxPath) {
  if (!fs.existsSync(pbxPath)) return
  let pbx = fs.readFileSync(pbxPath, 'utf8')
  const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'))
  const marketing = String(pkg.version || '1.0.0')
  const build = process.env.BUILD_NUMBER || process.env.PROJECT_BUILD_NUMBER || '1'
  pbx = pbx.replace(/PRODUCT_BUNDLE_IDENTIFIER = [^;]+;/g, 'PRODUCT_BUNDLE_IDENTIFIER = app.steady.calm;')
  pbx = pbx.replace(/MARKETING_VERSION = [^;]+;/g, `MARKETING_VERSION = ${marketing};`)
  pbx = pbx.replace(/CURRENT_PROJECT_VERSION = [^;]+;/g, `CURRENT_PROJECT_VERSION = ${build};`)
  pbx = pbx.replace(/developmentRegion = en;/, 'developmentRegion = tr;')
  if (!pbx.includes('tr,')) {
    pbx = pbx.replace(
      /knownRegions = \(\s*en,\s*Base,/,
      `knownRegions = (\n\t\t\t\ttr,\n\t\t\t\taz,\n\t\t\t\ten,\n\t\t\t\tru,\n\t\t\t\tes,\n\t\t\t\tit,\n\t\t\t\tBase,`,
    )
  }
  const team = (process.env.APPLE_TEAM_ID || '').trim()
  if (team && !pbx.includes('DEVELOPMENT_TEAM')) {
    pbx = pbx.replace(
      /PRODUCT_BUNDLE_IDENTIFIER = app\.steady\.calm;/g,
      `PRODUCT_BUNDLE_IDENTIFIER = app.steady.calm;\n\t\t\t\tDEVELOPMENT_TEAM = ${team};`,
    )
  }
  // StoreKit 2 (native/capacitor-storekit) needs iOS 15+.
  pbx = pbx.replace(/IPHONEOS_DEPLOYMENT_TARGET = [^;]+;/g, 'IPHONEOS_DEPLOYMENT_TARGET = 15.0;')
  pbx = addResourceFile(pbx, 'PrivacyInfo.xcprivacy')
  pbx = addInfoPlistStrings(pbx)
  fs.writeFileSync(pbxPath, pbx)
}

function patchPodfile() {
  const podfilePath = path.join(root, 'ios/App/Podfile')
  if (!fs.existsSync(podfilePath)) return
  let podfile = fs.readFileSync(podfilePath, 'utf8')
  // Match the app-wide deployment target bump in patchPbxproj (StoreKit 2 needs iOS 15+).
  podfile = podfile.replace(/platform :ios, '[^']+'/, "platform :ios, '15.0'")
  fs.writeFileSync(podfilePath, podfile)
}

function patchIos() {
  const plistPath = path.join(root, 'ios/App/App/Info.plist')
  if (!fs.existsSync(plistPath)) return
  let xml = fs.readFileSync(plistPath, 'utf8')
  xml = setPlistString(xml, 'CFBundleDevelopmentRegion', 'tr')
  xml = setPlistString(xml, 'CFBundleDisplayName', 'Steady')
  xml = setPlistStringArray(xml, 'CFBundleLocalizations', langs)
  xml = setPlistBool(xml, 'ITSAppUsesNonExemptEncryption', false)
  xml = setPlistStringArray(xml, 'UIBackgroundModes', ['audio'])
  xml = setPlistStringArray(xml, 'UISupportedInterfaceOrientations', ['UIInterfaceOrientationPortrait'])
  xml = setPlistString(xml, 'NSUserNotificationsUsageDescription', notifyCopy.tr)
  fs.writeFileSync(plistPath, xml)

  const appDir = path.join(root, 'ios/App/App')
  const privacySrc = path.join(root, 'native/ios/PrivacyInfo.xcprivacy')
  if (fs.existsSync(privacySrc)) {
    fs.copyFileSync(privacySrc, path.join(appDir, 'PrivacyInfo.xcprivacy'))
  }
  for (const l of langs) {
    const dir = path.join(appDir, `${l}.lproj`)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(
      path.join(dir, 'InfoPlist.strings'),
      `"CFBundleDisplayName" = "Steady";\n"NSUserNotificationsUsageDescription" = "${notifyCopy[l]}";\n`,
    )
  }
  const iconset = path.join(root, 'ios/App/App/Assets.xcassets/AppIcon.appiconset')
  const iconSrc = path.join(root, 'public/icon-1024.png')
  const iconDst = path.join(iconset, 'AppIcon-512@2x.png')
  if (fs.existsSync(iconSrc) && fs.existsSync(iconset)) {
    fs.copyFileSync(iconSrc, iconDst)
    fs.writeFileSync(
      path.join(iconset, 'Contents.json'),
      `${JSON.stringify(
        {
          images: [
            {
              filename: 'AppIcon-512@2x.png',
              idiom: 'universal',
              platform: 'ios',
              size: '1024x1024',
            },
          ],
          info: { author: 'xcode', version: 1 },
        },
        null,
        2,
      )}\n`,
    )
  }
  patchPbxproj(path.join(root, 'ios/App/App.xcodeproj/project.pbxproj'))
  patchAppDelegate()
  patchPodfile()
}

function patchAppDelegate() {
  const p = path.join(root, 'ios/App/App/AppDelegate.swift')
  if (!fs.existsSync(p)) return
  let s = fs.readFileSync(p, 'utf8')
  if (s.includes('AVAudioSession.sharedInstance()')) return
  if (!s.includes('import AVFoundation')) {
    s = s.replace(/^import UIKit/m, 'import UIKit\nimport AVFoundation')
  }
  const mark = 'didFinishLaunchingWithOptions'
  const at = s.indexOf(mark)
  if (at < 0) return
  const ret = s.indexOf('return true', at)
  if (ret < 0) return
  s =
    s.slice(0, ret) +
    `do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .spokenAudio)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {
            /* keep launch going */
        }
        ` +
    s.slice(ret)
  fs.writeFileSync(p, s)
}

function patchAndroid() {
  const resXml = path.join(root, 'android/app/src/main/res/xml')
  const manifest = path.join(root, 'android/app/src/main/AndroidManifest.xml')
  if (!fs.existsSync(manifest)) return
  fs.mkdirSync(resXml, { recursive: true })
  const localeConfig = path.join(resXml, 'locales_config.xml')
  fs.writeFileSync(
    localeConfig,
    `<?xml version="1.0" encoding="utf-8"?>
<locale-config xmlns:android="http://schemas.android.com/apk/res/android">
${langs.map((l) => `    <locale android:name="${l}"/>`).join('\n')}
</locale-config>
`,
  )
  let xml = fs.readFileSync(manifest, 'utf8')
  if (!xml.includes('android:localeConfig')) {
    xml = xml.replace('<application', '<application\n        android:localeConfig="@xml/locales_config"')
    fs.writeFileSync(manifest, xml)
  }
}

patchIos()
patchAndroid()
