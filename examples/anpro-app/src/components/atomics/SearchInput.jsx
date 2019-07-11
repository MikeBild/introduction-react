import React, { useRef } from 'react'
import { PrimaryActionButton } from './PrimaryActionButton'

export function SearchInput({ onSearch }) {
  const searchInputRef = useRef({ current: { value: '' } })

  return (
    <>
      <input type="search" ref={searchInputRef} />
      <PrimaryActionButton
        actionText="Suche"
        onAction={() => onSearch(searchInputRef.current.value)}
      />
    </>
  )
}
