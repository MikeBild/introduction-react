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
      message: ''
    }
  }

  async componentDidMount() {
    await delay(2000)
    try {
      const projects = await fetchProjects('')
      this.setState({
        projects
      })
    } catch(error) {
      this.setState({  message: error.message})
      const projects = await fetchProjects('demo')
      this.setState({
        projects,
        message: ''
      })
    }
  }

  render() {
    return (
      <MasterDetailLayout
        renderTitle={() => <PageTitle titleText="Projekte" />}
        renderSubtitle={() => <SearchInput onSearch={searchText => fetchProjects(searchText)} />}
      >
        <MDBCol md="8"><ProjectsTable projects={this.state.projects} message={this.state.message}/></MDBCol>
        <MDBCol md="4"><FacetteSearch /></MDBCol>
      </MasterDetailLayout>
    )
  }
}

async function fetchProjects(searchText) {
  console.log('Refetch', {searchText})

  if(searchText === '') {
    throw new Error('status code 400')
  }

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

function delay(timeInMs) {
  return new Promise(resolve => setTimeout(resolve, timeInMs))
}