import React, { PureComponent } from 'react'
import { MDBRow, MDBCol } from 'mdbreact'
import { MasterDetailLayout } from '../components/templates/Master-Detail-Layout'
import { PageTitle } from '../components/atomics/PageTitle'
import { SearchInput } from '../components/atomics/SearchInput'
import { FacetteSearch } from '../components/organisms/FacetteSearch'
import { ProjectsTable } from '../components/organisms/ProjectsTable'

export class ProjectePage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      projects: [],
      message: '',
      isProjectsLoading: false
    }
  }

  async componentDidMount() {
    await this.refreshProjects()
  }

  async refreshProjects() {
    this.setState({isProjectsLoading: true})
    await delay(2000)
    try {
      const projects = await fetchProjects('')
      this.setState({
        projects,
        isProjectsLoading: false
      })
    } catch(error) {
      this.setState({
        message: error.message,
        isProjectsLoading: false
      })
    }
  }

  render() {
    return (
      <MasterDetailLayout
        renderTitle={() => <PageTitle titleText="Projekte" />}
        renderSubtitle={() => <SearchInput onSearch={searchText => fetchProjects(searchText)} />}
      >
        <MDBCol md="8">
          <ProjectsTable
            isLoading={this.state.isProjectsLoading}
            projects={this.state.projects}
            message={this.state.message}
            onRefresh={() => this.refreshProjects()}
          />
        </MDBCol>
        <MDBCol md="4"><FacetteSearch /></MDBCol>
      </MasterDetailLayout>
    )
  }
}

async function fetchProjects(searchText) {
  const response = await fetch('http://localhost:8080/projects')
  const projects = await response.json()
  return projects
}

function delay(timeInMs) {
  return new Promise(resolve => setTimeout(resolve, timeInMs))
}