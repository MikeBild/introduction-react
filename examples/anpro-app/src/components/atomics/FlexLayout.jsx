import React from 'react'

export function FlexLayout ({ children }) {
  return (
    <div style={{display: 'flex'}}>
      {children}
    </div>
  )
}