import React from 'react'

import { FlexLayout } from '../atomics/FlexLayout'
import { PageTitle } from '../atomics/PageTitle'
import { SearchInput } from '../atomics/SearchInput'
import { FacetteSearch } from '../organisms/FacetteSearch'
import { ProjectsTable } from '../organisms/ProjectsTable'

export function ProjectePage () {
  return (
    <>
      <PageTitle />
      <SearchInput />
      <FlexLayout>
        <ProjectsTable />
        <FacetteSearch />
      </FlexLayout>
    </>
  )
}



