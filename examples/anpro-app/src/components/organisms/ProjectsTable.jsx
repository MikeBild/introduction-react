import React from 'react'

export function ProjectsTable ({projects = [], message = ''}) {
  console.log({projects, message})
  return (
    <>
      <div>{message}</div>
      <div style={{border: '1px solid black', height: 'calc(100vh - 80px)'}}></div>
    </>
  )
}