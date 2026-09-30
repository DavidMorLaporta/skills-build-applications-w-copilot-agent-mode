import app from './app.js'

const port = Number(process.env.PORT ?? 8000)

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit Tracker API listening on port ${port}`)
})
