import React from 'react'

const Layout = ({title, description, children}, context) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
    <div>
      {children}
    </div>
  </div>
)

export default Layout