import React from 'react';
import { shallow, render } from 'enzyme';
import { PageTitle } from './PageTitle';

describe('Component <PageTitle />', () => {
  const sut = shallow(<PageTitle />);

  it('renders a default page tile', () => {
    expect(sut.find('h1').exists()).toBe(true);
  });

  it('renders a default page tile', () => {
    expect(sut.find('h1').text()).toBe('Empty');
  });
});

describe('Component <PageTitle titleText="Hello" />', () => {
  const sut = shallow(<PageTitle titleText="Hello" />);

  it('renders a "Hello" page tile', () => {
    expect(sut.find('h1').text()).toBe('Hello');
  });
});