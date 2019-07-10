import React, { PureComponent } from 'react'

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
        <button onClick={() => this.props.onSearch(this.state.searchText)}>Suche mit {this.state.searchText}</button>
      </>
    )
  }
}
