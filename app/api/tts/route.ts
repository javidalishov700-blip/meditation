import { handleTts } from '../../../server/tts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** Next.js App Router: POST /api/tts */
export async function POST(request: Request) {
  return handleTts(request)
}
