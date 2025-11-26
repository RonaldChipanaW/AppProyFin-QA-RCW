import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import tasksRouter from './routes/tasks.routes.js'

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static('public'))

app.use('/tasks', tasksRouter)

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'public' })
})

export default app
