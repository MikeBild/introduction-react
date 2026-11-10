import React from 'react';
import { shallow, render } from 'enzyme';
import Header from './index';

describe('<Header />', () => {
  const sut = shallow(<Header />);

  it('renders correctly', () => {
    expect(sut).toMatchSnapshot();
  });

  it('renders a default header', () => {
    expect(sut.find('h1').exists()).toBe(true);
  });

  it('renders "Hello World" header', () => {
    expect(sut.find('h1').text()).toBe('Hello World');
  });
});

describe('<Header /> with name', () => {
  const sut = shallow(<Header name="Joe" />);

  it('renders "Hello Joe" header', () => {
    expect(sut.find('h1').text()).toBe('Hello Joe');
  });
});
