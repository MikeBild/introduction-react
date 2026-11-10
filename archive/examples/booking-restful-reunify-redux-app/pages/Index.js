import React from 'react';
import styled from 'styled-components';
import SearchList from './components/SearchList';
import appPackage from '../package.json';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {
  searchSuccessReducer,
  searchFailureReducer,
} from './IndexActionReducer';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({
    searchSuccessReducer,
    searchFailureReducer,
  }),
  applyMiddleware(thunk),
);

const StyledTitle = styled.h1`
  color: #2196f3;
`;

export class Index extends React.Component {
  static async getInitialProps() {
    return {
      search: {},
    };
  }

  render() {
    return (
      <Provider store={store}>
        <div>
          <StyledTitle>
            Trip Booker (v
            {appPackage.version})
          </StyledTitle>
          <SearchList />
        </div>
      </Provider>
    );
  }
}

export default Index;
