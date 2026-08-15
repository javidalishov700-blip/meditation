export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds))
  const m = Math.floor(s / 60)
  const r = s % 60
  if (m <= 0) return `${r} sn`
  return `${m} dk ${r.toString().padStart(2, '0')} sn`
}

export function formatClock(ts: number): string {
  return new Date(ts).toLocaleString('tr-TR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function greeting(now = new Date()): string {
  const h = now.getHours()
  if (h < 6) return 'Gece yarısı'
  if (h < 12) return 'Günaydın'
  if (h < 18) return 'İyi günler'
  return 'İyi akşamlar'
}
