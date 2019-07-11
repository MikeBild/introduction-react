const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(cors({ origin: 'http://localhost:1234' }))
app.use(bodyParser.json({}))

const mockProjects = require('./mocks/projects.json')

app.get('/projects', (req, res) => {
  const latestDateProject = mockProjects
    .map(project => ({ ...project, date: new Date() }))

  res.send(latestDateProject)
})

app.post('/validate', (req, res) => {
  if (req.body.username && req.body.username !== 'mike') {
    return res.sendStatus(403);
  }

  res.send({
    ...req.body,
    token: 'abc',
  })

})

const instance = app.listen(8080, () => console.log(`Listen on ${instance.address().port}`))
