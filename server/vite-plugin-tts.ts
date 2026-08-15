import type { IncomingMessage, ServerResponse } from 'node:http'
import type { Plugin } from 'vite'
import { handleTts } from './tts.ts'

async function readBody(req: IncomingMessage) {
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk))
  }
  return Buffer.concat(chunks)
}

export function ttsApiPlugin(apiKey: string): Plugin {
  async function run(req: IncomingMessage, res: ServerResponse) {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
      res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
      res.end()
      return
    }
    const body = await readBody(req)
    const origin = `http://${req.headers.host || 'localhost'}`
    const webReq = new Request(`${origin}/api/tts`, {
      method: req.method || 'POST',
      headers: { 'Content-Type': String(req.headers['content-type'] || 'application/json') },
      body: body.length ? body : undefined,
    })
    const webRes = await handleTts(webReq, apiKey)
    res.statusCode = webRes.status
    webRes.headers.forEach((value, key) => res.setHeader(key, value))
    res.end(Buffer.from(await webRes.arrayBuffer()))
  }

  return {
    name: 'steady-tts',
    configureServer(server) {
      server.middlewares.use('/api/tts', (req, res) => {
        void run(req, res)
      })
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/tts', (req, res) => {
        void run(req, res)
      })
    },
  }
}
