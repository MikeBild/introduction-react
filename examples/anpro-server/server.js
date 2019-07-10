const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors({ origin: 'http://localhost:1234' }))

const mockProjects = require('./mocks/projects.json')

app.get('/projects', (req, res) => {
  const latestDateProject = mockProjects
    .map(project => ({ ...project, date: new Date() }))

  res.send(latestDateProject)
})

const instance = app.listen(8080, () => console.log(`Listen on ${instance.address().port}`))
