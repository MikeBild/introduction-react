import React from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

const EmptyDefaultValue = () => {
  return <div>Empty</div>
}

export function MasterDetailLayout ({ renderTitle, renderSubtitle = EmptyDefaultValue, children }) {
  return (
    <MDBContainer fluid>
      <MDBRow><MDBCol md="12">{renderTitle()}</MDBCol></MDBRow>
      <MDBRow><MDBCol md="12">{renderSubtitle()}</MDBCol></MDBRow>
      <MDBRow>
        {children}
      </MDBRow>
    </MDBContainer>
  )
}