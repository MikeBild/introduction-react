import assert from 'assert';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { shallowWithStore } from 'enzyme-redux';
import { createMockStore } from 'redux-test-utils';
import { connect } from 'react-redux';

import { HelloWorld } from '../src/components/HelloWorld/HelloWorld';

describe('A Redux-React-Component test', () => {
  it('<HelloWorld /> should render initial value `Hello, Foo`', () => {
    // Arrange + Act ()
    const store = { greeting: 'Foo' };
    const mapStateToProps = state => ({ greeting: state.greeting });
    const ConnectedComponent = connect(mapStateToProps)(HelloWorld);
    const component = shallowWithStore(
      <ConnectedComponent />,
      createMockStore(store),
    );

    // Assert
    assert.equal(component.props().greeting, 'Foo');
    assert.equal(
      component
        .dive()
        .find('p')
        .text(),
      `Hello, Foo`,
    );
  });

  it('<HelloWorld /> dispatching a UPDATE_GREETING action', () => {
    // Arrange
    const action = { type: 'UPDATE_GREETING' };
    const mapDispatchToProps = dispatch => ({
      updateGreeting() {
        dispatch(action);
      },
    });

    const mockStore = createMockStore();
    const ConnectedComponent = connect(
      null,
      mapDispatchToProps,
    )(HelloWorld);
    const component = shallowWithStore(<ConnectedComponent />, mockStore);

    // Act
    component.props().updateGreeting();

    // Assert
    assert.equal(mockStore.isActionDispatched(action), true);
  });
});
