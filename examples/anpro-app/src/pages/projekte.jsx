import React, { PureComponent, useState, useEffect } from 'react'
import { MDBRow, MDBCol } from 'mdbreact'

import { MasterDetailLayout } from '../components/templates/Master-Detail-Layout'
import { PageTitle } from '../components/atomics/PageTitle'
import { SearchInput } from '../components/atomics/SearchInput'
import { FacetteSearch } from '../components/organisms/FacetteSearch'
import { ProjectsTable } from '../components/organisms/ProjectsTable'

export function ProjectePage() {
  const [projects, setProjects] = useState([])
  const [message, setMessage] = useState('')
  const [isProjectsLoading, setIsProjectsLoading] = useState(false)

  useEffect(() => {
    refreshProjects()
  }, [])

  const refreshProjects = async () => {
    setIsProjectsLoading(true)

    await delay(2000)
    try {
      const newProjects = await fetchProjects('')
      setProjects(newProjects)
      setIsProjectsLoading(false)
      setMessage('')
    } catch(error) {
      setIsProjectsLoading(false)
      setMessage(error.message)
    }
  }

  return (

    <MasterDetailLayout
      renderTitle={() => <PageTitle titleText="Projekte" />}
      renderSubtitle={() => <SearchInput onSearch={searchText => fetchProjects(searchText)} />}
    >
      <MDBCol md="8">
        <ProjectsTable
          isLoading={isProjectsLoading}
          projects={projects}
          message={message}
          onRefresh={() => refreshProjects()}
        />
      </MDBCol>
      <MDBCol md="4"><FacetteSearch /></MDBCol>
    </MasterDetailLayout>
  )
}

async function fetchProjects(searchText) {
  console.log({searchText})
  const response = await fetch('http://localhost:8080/projects')
  const projects = await response.json()
  return projects
}

function delay(timeInMs) {
  return new Promise(resolve => setTimeout(resolve, timeInMs))
}