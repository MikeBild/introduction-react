import React, { useContext } from 'react'

import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'

import { AuthConsumer } from '../../lib/AuthContext'

const EmptyDefaultValue = () => {
  return <div>Empty</div>
}

export function MasterDetailLayout ({ renderTitle, renderSubtitle = EmptyDefaultValue, children }) {
  const { user } = useContext(AuthConsumer)
  return (
    <MDBContainer fluid>
      <MDBRow><MDBCol md="12" style={{width: '100%', height: '40px'}}>Username: {user.username}</MDBCol></MDBRow>
      <MDBRow><MDBCol md="12" style={{width: '100%', height: '40px'}}>{renderTitle()}</MDBCol></MDBRow>
      <MDBRow><MDBCol md="12" style={{width: '100%', height: '40px'}}>{renderSubtitle()}</MDBCol></MDBRow>
      <MDBRow>
        {children}
      </MDBRow>
    </MDBContainer>
  )
}