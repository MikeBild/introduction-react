import React from 'react'
import { MDBRow, MDBCol } from 'mdbreact'
import { MasterDetailLayout } from '../templates/Master-Detail-Layout'
import { PageTitle } from '../atomics/PageTitle'
import { SearchInput } from '../atomics/SearchInput'
import { FacetteSearch } from '../organisms/FacetteSearch'
import { ProjectsTable } from '../organisms/ProjectsTable'

export function ProjectePage () {
  return (
    <MasterDetailLayout
      renderTitle={() => <PageTitle titleText="Hello World - foo" />}
      renderSubtitle={() => <SearchInput />}
    >
      <MDBCol md="8"><ProjectsTable /></MDBCol>
      <MDBCol md="4"><FacetteSearch /></MDBCol>
    </MasterDetailLayout>
  )
}



