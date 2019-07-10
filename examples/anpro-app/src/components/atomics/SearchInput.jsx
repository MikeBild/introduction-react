import React, { PureComponent } from 'react'
import { PrimaryActionButton } from './PrimaryActionButton'
export class SearchInput extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      searchText: ''
    }
  }

  render() {
    return (
      <>
        <input type="search" onChange={e => this.setState({searchText: e.currentTarget.value})} />
        <PrimaryActionButton
          actionText={`Suche mit ${this.state.searchText}`}
          onAction={() => this.props.onSearch(this.state.searchText)}
        />
      </>
    )
  }
}
