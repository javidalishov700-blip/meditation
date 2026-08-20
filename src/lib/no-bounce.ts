/**
 * iOS elastic-overscroll killer.
 *
 * WKWebView starts a rubber-band bounce when a drag begins with the scroller
 * already pinned at the very top or the very bottom — that bounce is what shows
 * up as a large blank gap above or below the content. `overscroll-behavior: none`
 * stops it, but only from iOS 16 on, and StoreKit 2 lets this app run on iOS 15.
 *
 * So park the scroller one pixel inside its range the instant a finger lands:
 * with the scroller off the boundary there is nothing for iOS to bounce against,
 * and the drag that follows behaves exactly as before. One pixel is invisible,
 * and the listener is passive, so it costs nothing on the scroll path.
 */
export function armNoBounce(): () => void {
  if (typeof document === 'undefined') return () => undefined

  const onTouchStart = (event: TouchEvent) => {
    const target = event.target
    if (!(target instanceof Element)) return
    const el = target.closest<HTMLElement>('.app-scroll')
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    // Nothing to scroll: there is no boundary to peel away from.
    if (max <= 0) return
    if (el.scrollTop <= 0) el.scrollTop = 1
    else if (el.scrollTop >= max) el.scrollTop = max - 1
  }

  document.addEventListener('touchstart', onTouchStart, { passive: true })
  return () => document.removeEventListener('touchstart', onTouchStart)
}
