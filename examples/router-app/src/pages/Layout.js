import React from 'react'

const Layout = ({children}) => (
  <div>
    <header>header ...</header>
    <content>{children}</content>
    <footer>footer ...</footer>
  </div>
)

export default Layout