import React from 'react'
import { Link } from 'react-router'

const Home = props => (
  <div>
    <h1>Home</h1>
    <ul>
      <li><Link to="/about">About</Link></li>
      <li><Link to="/resources">Resources</Link></li>
    </ul>
  </div>
)

export default Home