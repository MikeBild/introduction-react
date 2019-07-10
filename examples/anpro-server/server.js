const express = require('express')
const app = express()

const mockProjects = require('./mocks/projects.json')

app.get('/projects', (req, res) => {
  response.send(mockProjects)
})

const instance = app.listen(8080, () => console.log(`Listen on ${instance.address().port}`))
