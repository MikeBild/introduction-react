import React from 'react'
import styled from 'styled-components'
import {connect} from 'react-redux';
import SearchItem from './SearchItem'
import {fetchSearchAction} from '../IndexActionReducer';

const SearchInputContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0;
`

const SearchInput = styled.input`
  border: 2px solid #2196F3;
  padding: 10px;
  margin: 10px 0;
  min-width: 200px;
`

const FailureMessage = styled.div`
  color: #f44336;
  font-weight: bold;
  max-width: 200px;
`

export class SearchList extends React.Component {
  componentDidMount() {
    this.props.fetchSearch();
  }

  render () {
    const {search, error, fetchSearch} = this.props
    return (
      <div>
        <SearchInputContainer>
          <div>
            <label><i className="fa fa-search" />Search by location (MUC, BER)</label>
            <br/>
            <SearchInput type="search" onBlur={e => fetchSearch({location: e.target.value})} />
          </div>
        </SearchInputContainer>
        <hr />
        {
          search &&
          search.map((x, i) => <SearchItem key={i} {...x} />)
        }
        {
          error &&
          error.message &&
          <FailureMessage>{error.message}</FailureMessage>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.searchSuccessReducer,
    error: state.searchFailureReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearch: location => dispatch(fetchSearchAction(location)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchList)