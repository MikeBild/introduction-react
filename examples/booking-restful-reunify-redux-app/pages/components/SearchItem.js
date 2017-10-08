import React from 'react'
import styled from 'styled-components'

const SearchItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 0;
`

const SearchItem = props => {
  const {id, __typename, location, price} = props

  const SearchItemType = () => (
    <div>
      {
        __typename === 'Flight' &&
        <i className="fa fa-plane" />
      }
      {
        __typename === 'Hotel' &&
        <i className="fa fa-bed" />
      }
      {
        __typename === 'Car' &&
        <i className="fa fa-car" />
      }
      <strong>&nbsp;{location}</strong>
    </div>
  )

  return (
    <SearchItemContainer>
      <SearchItemType />
      <div>{price} €</div>
    </SearchItemContainer>
  )
}

export default SearchItem