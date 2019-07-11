import React, { createRef } from 'react'
import { PrimaryActionButton } from './PrimaryActionButton'

export function SearchInput(props) {
  const searchInput = createRef()
  const searchInputText = searchInput.current && searchInput.current.value

  return (
    <>
      <input type="search" ref={searchInput} />
      <PrimaryActionButton
        actionText="Suche"
        onAction={() => props.onSearch(searchInputText)}
      />
    </>
  )
}
