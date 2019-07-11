const express = require('express')
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors')
const bodyParser = require('body-parser')
const mockProjects = require('./mocks/projects.json')
const mockOffers = require('./mocks/offers.json')
const mockCustomers = require('./mocks/customers.json')

const app = express()
app.use(cors({ origin: 'http://localhost:1234' }))
app.use(bodyParser.json({}))

const typeDefs = `
type Project {
  id: ID!
  title: String
  classifier: String
  city: String
  date: String
  offers: [Offer]
}

type Offer {
  id: ID!
  date: String
  customer: Customer
  project: Project
}

type Customer {
  id: ID!
  name: String
  offer: Offer
}

type Query {
  projects: [Project]
  project(id: ID!): Project
  offers: [Offer]
  offer(id: ID!): Offer
  customers: [Customer]
  customer(id: ID!): Customer
}
`
const resolvers = {
  Project: {
    offers(parent) {
      return mockOffers.filter(x => x.projectId == parent.id)
    }
  },
  Offer: {
    customer(parent) {
      return mockCustomers.find(x => x.id === parent.customerId)
    },
    project(parent) {
      return mockProjects.find(x => x.id === parent.projectId)
    }
  },
  Customer: {
    offer(parent) {
      return mockOffers.find(x => x.id === parent.id)
    }
  },
  Query: {
    projects() {
      return mockProjects
    },
    project(parent, { id }) {
      return mockProjects.find(x => x.id == id)
    },
    offers() {
      return mockOffers
    },
    offer(parent, { id }) {
      return mockOffers.find(x => x.id == id)
    },
    customers() {
      return mockCustomers
    },
    customer(parent, { id }) {
      return mockCustomers.find(x => x.id == id)
    }
  }
}
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

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
