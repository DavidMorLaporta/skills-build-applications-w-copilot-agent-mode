import express from 'express'
import apiRouter from './routes/api.js'

const app = express()
const codespaceName = process.env.CODESPACE_NAME
const allowedOrigins = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
])

app.use((request, response, next) => {
  const origin = request.get('Origin')

  if (origin && allowedOrigins.has(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Vary', 'Origin')
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type')

    if (request.method === 'OPTIONS') {
      response.sendStatus(204)
      return
    }
  }

  next()
})

app.use(express.json())

app.use('/api', apiRouter)

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' })
})

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error)
  response.status(500).json({ error: 'Internal server error' })
})

export default app
