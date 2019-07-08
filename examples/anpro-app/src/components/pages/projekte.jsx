import React from 'react'
import { MDBRow, MDBCol } from 'mdbreact'
import { FlexLayout } from '../atomics/FlexLayout'
import { PageTitle } from '../atomics/PageTitle'
import { SearchInput } from '../atomics/SearchInput'
import { FacetteSearch } from '../organisms/FacetteSearch'
import { ProjectsTable } from '../organisms/ProjectsTable'

export function ProjectePage () {
  return (
    <>
      <MDBRow><MDBCol md="12"><PageTitle /></MDBCol></MDBRow>
      <MDBRow><MDBCol md="12"><SearchInput /></MDBCol></MDBRow>
      <MDBRow>
        <MDBCol md="8"><ProjectsTable /></MDBCol>
        <MDBCol md="4"><FacetteSearch /></MDBCol>
      </MDBRow>
    </>
  )
}



