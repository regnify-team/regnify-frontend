import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

// Helper to read JSON file
const readData = (filename) => {
  const filePath = path.join(__dirname, 'data', filename)
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  }
  return null
}

// Basic route
app.get('/', (req, res) => {
  res.send('Regnify API Server Running')
})

// Example route - to be expanded
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from Express!' })
})

app.get('/api/invoices', (req, res) => {
  const data = readData('invoices.json')
  if (data) {
    res.json(data)
  } else {
    res.status(404).json({ error: 'Data not found' })
  }
})

app.get('/api/dashboard', (req, res) => {
  const data = readData('dashboard.json')
  if (data) {
    res.json(data)
  } else {
    res.status(404).json({ error: 'Data not found' })
  }
})

app.get('/api/analytics', (req, res) => {
  const data = readData('analytics.json')
  if (data) {
    res.json(data)
  } else {
    res.status(404).json({ error: 'Data not found' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
