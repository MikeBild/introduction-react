import React, { Component } from 'react';
import { NavBar, NavItem } from './Nav';
import Main from './Main';
import Gist from './Gist';
import Home from './Home';
import { Link, Route } from 'react-router-dom';

const style = {
  display: 'flex',
  alignItems: 'stretch',
};

export default ({ gists }) => (
  <div style={style}>
    <NavBar>
      {gists ? (
        gists.map(gist => (
          <NavItem key={gist.id}>
            <Link to={`/g/${gist.id}`}>
              {gist.description || '[no description]'}
            </Link>
          </NavItem>
        ))
      ) : (
        <p>Loading</p>
      )}
    </NavBar>
    <Main>
      <Route path="/" exact component={Home} />
      {gists && (
        <Route
          path="/g/:gistId"
          render={({ match }) => (
            <Gist gist={gists.find(g => g.id === match.params.gistId)} />
          )}
        />
      )}
    </Main>
  </div>
);
