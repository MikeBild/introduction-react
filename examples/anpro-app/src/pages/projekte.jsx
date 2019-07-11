import React, { PureComponent, useState, useEffect, useContext } from 'react'
import { MDBRow, MDBCol } from 'mdbreact'

import { MasterDetailLayout } from '../components/templates/Master-Detail-Layout'
import { PageTitle } from '../components/atomics/PageTitle'
import { SearchInput } from '../components/atomics/SearchInput'
import { FacetteSearch } from '../components/organisms/FacetteSearch'
import { ProjectsTable } from '../components/organisms/ProjectsTable'
import { AuthConsumer } from '../lib/AuthContext';

export function ProjectePage() {
  const [projects, setProjects] = useState([])
  const [message, setMessage] = useState('')
  const [isProjectsLoading, setIsProjectsLoading] = useState(false)
  const {user: { token }} = useContext(AuthConsumer)

  useEffect(() => {
    refreshProjects()
  }, [])

  const refreshProjects = async () => {
    setIsProjectsLoading(true)

    await delay(2000)
    try {
      const newProjects = await fetchProjects('', token)
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

async function fetchProjects(searchText, userToken) {
  const response = await fetch('http://localhost:8080/projects', {
    headers: {
      'x-my-super-token': userToken
    }
  })
  const projects = await response.json()
  return projects
}

function delay(timeInMs) {
  return new Promise(resolve => setTimeout(resolve, timeInMs))
}