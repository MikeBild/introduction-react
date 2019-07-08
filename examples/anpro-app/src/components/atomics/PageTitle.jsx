import React from 'react'

export function PageTitle ({ titleText = 'Empty' }) {
  return (
    <div style={{border: '1px solid black', width: '100%', height: '40px'}}>
      {titleText}
    </div>
  )
}
