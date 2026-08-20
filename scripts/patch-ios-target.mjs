/**
 * After `npx cap add/sync ios` (Codemagic generates the Xcode project fresh on
 * every build, so both of these have to be re-applied each time).
 *
 * 1. iPhone only. Capacitor ships TARGETED_DEVICE_FAMILY = "1,2", which offers
 *    the app on iPad too — but the UI is a portrait, touch-first phone layout
 *    inside a max-w-lg column, so on a 13" iPad it renders as a narrow strip
 *    between two wide empty margins. Shipping that invites a 4.0 design
 *    rejection, and it forces an iPad screenshot set that would show the same
 *    thing. iPhone only is the honest shape of this app today.
 *
 * 2. Export-compliance answer. The app only uses HTTPS and the OS's own Web
 *    Crypto (SHA-256 hashing for the optional PIN, getRandomValues for salts) —
 *    all exempt. Declaring it here stops App Store Connect asking on every
 *    single upload.
 */
import fs from 'node:fs'

const pbxproj = 'ios/App/App.xcodeproj/project.pbxproj'
const plist = 'ios/App/App/Info.plist'

function fail(message) {
  console.error(`patch-ios-target: ${message}`)
  process.exit(1)
}

// --- 1. iPhone only -------------------------------------------------------
if (!fs.existsSync(pbxproj)) fail(`${pbxproj} not found — run after \`npx cap sync ios\``)

const projectBefore = fs.readFileSync(pbxproj, 'utf8')
// Fail only when the setting is missing altogether. Rewriting a value that is
// already "1" is a no-op, not an error — the script has to survive a re-run.
if (!/TARGETED_DEVICE_FAMILY = /.test(projectBefore)) fail('no TARGETED_DEVICE_FAMILY entry to rewrite')
const project = projectBefore.replace(/TARGETED_DEVICE_FAMILY = "?[^";\n]+"?;/g, 'TARGETED_DEVICE_FAMILY = "1";')
fs.writeFileSync(pbxproj, project)
const familyCount = (project.match(/TARGETED_DEVICE_FAMILY = "1";/g) || []).length
console.log(`patch-ios-target: TARGETED_DEVICE_FAMILY = "1" on ${familyCount} build config(s)`)

// --- 2. Export compliance -------------------------------------------------
if (!fs.existsSync(plist)) fail(`${plist} not found — run after \`npx cap sync ios\``)

const plistBefore = fs.readFileSync(plist, 'utf8')
let plistOut = plistBefore
if (plistOut.includes('ITSAppUsesNonExemptEncryption')) {
  plistOut = plistOut.replace(
    /<key>ITSAppUsesNonExemptEncryption<\/key>\s*<(?:true|false)\/>/,
    '<key>ITSAppUsesNonExemptEncryption</key>\n\t<false/>',
  )
} else {
  // Insert at the top of the root <dict>, which is the first one in the file.
  plistOut = plistOut.replace('<dict>', '<dict>\n\t<key>ITSAppUsesNonExemptEncryption</key>\n\t<false/>')
}
if (!plistOut.includes('<key>ITSAppUsesNonExemptEncryption</key>\n\t<false/>')) {
  fail('could not write ITSAppUsesNonExemptEncryption into Info.plist')
}
fs.writeFileSync(plist, plistOut)
console.log('patch-ios-target: ITSAppUsesNonExemptEncryption = false')
