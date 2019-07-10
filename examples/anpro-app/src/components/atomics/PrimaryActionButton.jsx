import React from 'react'

export function PrimaryActionButton ({actionText, onAction}) {
  return (
    <button onClick={() => onAction()}>
      {actionText}
    </button>
  )
}