require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name = 'CapacitorStorekitNative'
  s.version = package['version']
  s.summary = package['description']
  s.license = 'UNLICENSED'
  s.homepage = 'https://steady.app'
  s.author = 'Steady'
  s.source = { :git => 'https://github.com/steady/steady.git', :tag => s.version.to_s }
  s.source_files = 'ios/Sources/StoreKitPlugin/**/*.{swift,h,m}'
  s.ios.deployment_target = '15.0'
  s.frameworks = 'StoreKit'
  s.dependency 'Capacitor'
  s.swift_version = '5.1'
end
