import fs from 'node:fs'
import path from 'node:path'

const langs = ['tr', 'az', 'en', 'ru', 'es', 'it']
const root = process.cwd()

function patchIos() {
  const plistPath = path.join(root, 'ios/App/App/Info.plist')
  if (!fs.existsSync(plistPath)) return
  let xml = fs.readFileSync(plistPath, 'utf8')
  if (!xml.includes('CFBundleLocalizations')) {
    const block = `	<key>CFBundleDevelopmentRegion</key>
	<string>tr</string>
	<key>CFBundleLocalizations</key>
	<array>
${langs.map((l) => `		<string>${l}</string>`).join('\n')}
	</array>
`
    xml = xml.replace('</dict>\n</plist>', `${block}</dict>\n</plist>`)
    fs.writeFileSync(plistPath, xml)
  }
  const appDir = path.join(root, 'ios/App/App')
  for (const l of langs) {
    const dir = path.join(appDir, `${l}.lproj`)
    fs.mkdirSync(dir, { recursive: true })
    const strings = path.join(dir, 'InfoPlist.strings')
    if (!fs.existsSync(strings)) {
      fs.writeFileSync(strings, '"CFBundleDisplayName" = "Steady";\n')
    }
  }
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
