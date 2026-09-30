import app from './app.js'
import { connectDatabase } from './config/database.js'

const port = Number(process.env.PORT ?? 8000)
const codespaceName = process.env.CODESPACE_NAME
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`

async function startServer(): Promise<void> {
  await connectDatabase()

  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker API listening at ${apiBaseUrl}`)
  })
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit Tracker API:', error)
  process.exitCode = 1
})
