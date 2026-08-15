import { Capacitor } from '@capacitor/core'

export function isNativeApp() {
  return Capacitor.isNativePlatform()
}

export function nativePlatform() {
  return Capacitor.getPlatform()
}

export function isIosDevice() {
  if (Capacitor.getPlatform() === 'ios') return true
  return /iPhone|iPad|iPod/i.test(navigator.userAgent || '')
}

export function isAndroidDevice() {
  if (Capacitor.getPlatform() === 'android') return true
  return /Android/i.test(navigator.userAgent || '')
}

/** Opens the phone’s app settings page (iOS: Language lives there). Web returns false. */
export async function openPhoneLanguageSettings(): Promise<boolean> {
  if (!Capacitor.isNativePlatform()) return false
  const { AndroidSettings, IOSSettings, NativeSettings } = await import('capacitor-native-settings')
  await NativeSettings.open({
    optionAndroid: AndroidSettings.ApplicationDetails,
    optionIOS: IOSSettings.App,
  })
  return true
}

export async function onAppResume(fn: () => void): Promise<() => void> {
  if (!Capacitor.isNativePlatform()) return () => undefined
  const { App } = await import('@capacitor/app')
  const handle = await App.addListener('appStateChange', ({ isActive }) => {
    if (isActive) fn()
  })
  return () => {
    void handle.remove()
  }
}
