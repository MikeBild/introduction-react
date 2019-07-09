import React from 'react'
import { MDBRow, MDBCol } from 'mdbreact'
import { MasterDetailLayout } from '../components/templates/Master-Detail-Layout'
import { PageTitle } from '../components/atomics/PageTitle'
import { SearchInput } from '../components/atomics/SearchInput'
import { FacetteSearch } from '../components/organisms/FacetteSearch'
import { ProjectsTable } from '../components/organisms/ProjectsTable'

export function ProjectPage () {
  return (
    <MasterDetailLayout
      renderTitle={() => <PageTitle titleText="Project Nr. xyz" />}
      renderSubtitle={() => <><SearchInput /><button>Neu</button></>}
    >
      <MDBCol md="8"><ProjectsTable /></MDBCol>
      <MDBCol md="4"><FacetteSearch /></MDBCol>
    </MasterDetailLayout>
  )
}



