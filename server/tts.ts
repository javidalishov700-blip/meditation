const MAX = 4096
const SPEED = 0.85
const VOICES = new Set(['nova', 'shimmer'])

export async function handleTts(request: Request, apiKey = process.env.OPENAI_API_KEY): Promise<Response> {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'POST only' }), {
      status: 405,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'missing_key' }), {
      status: 503,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
  let body: { text?: unknown; voice?: unknown }
  try {
    body = (await request.json()) as { text?: unknown; voice?: unknown }
  } catch {
    return new Response(JSON.stringify({ error: 'bad_json' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
  const text = typeof body.text === 'string' ? body.text.trim() : ''
  if (!text) {
    return new Response(JSON.stringify({ error: 'empty' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
  if (text.length > MAX) {
    return new Response(JSON.stringify({ error: 'too_long' }), {
      status: 400,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
  const voice = typeof body.voice === 'string' && VOICES.has(body.voice) ? body.voice : 'nova'
  const upstream = await fetch('https://api.openai.com/v1/audio/speech', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'tts-1',
      voice,
      speed: SPEED,
      input: text,
      response_format: 'mp3',
    }),
  })
  if (!upstream.ok) {
    const detail = await upstream.text()
    return new Response(JSON.stringify({ error: 'openai', detail: detail.slice(0, 240) }), {
      status: 502,
      headers: { ...cors, 'Content-Type': 'application/json' },
    })
  }
  return new Response(upstream.body, {
    status: 200,
    headers: {
      ...cors,
      'Content-Type': 'audio/mpeg',
      'Cache-Control': 'no-store',
    },
  })
}
