import React from 'react'
import { MDBRow, MDBCol } from 'mdbreact'
import { MasterDetailLayout } from '../components/templates/Master-Detail-Layout'
import { PageTitle } from '../components/atomics/PageTitle'
import { SearchInput } from '../components/atomics/SearchInput'
import { FacetteSearch } from '../components/organisms/FacetteSearch'
import { ProjectsTable } from '../components/organisms/ProjectsTable'

export function ProjectePage () {
  return (
    <MasterDetailLayout
      renderTitle={() => <PageTitle titleText="Projekte" />}
      renderSubtitle={() => <SearchInput onSearch={searchText => fetchProjects(searchText)} />}
    >
      <MDBCol md="8"><ProjectsTable /></MDBCol>
      <MDBCol md="4"><FacetteSearch /></MDBCol>
    </MasterDetailLayout>
  )
}

async function fetchProjects(searchText) {
  console.log('Refetch', {searchText})
  return [{
    id: 1,
    title: 'Projekt 1',
    city: 'Leipzip',
    classifier: 1,
    date: new Date()
  }, {
    id: 2,
    title: 'Projekt 2',
    city: 'Berlin',
    classifier: 2,
    date: new Date()
  }]
}

