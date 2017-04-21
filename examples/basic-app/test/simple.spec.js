import assert from 'assert'
import React from 'react'
import { mount, shallow } from 'enzyme'

import Body from '../src/components/Body'
import PageTitle from '../src/components/PageTitle'
import { StateHandler } from '../src/components/EventHandler'

describe('A simple React-Component test', () => {

  it('<Body /> should have h1 DOM-Element', () => {
    const wrapper = shallow(<Body />)
    assert.ok(wrapper.find('h1').length)
    console.log(wrapper.find('h1').text())
  })

  it('<PageTitle /> should have h1 DOM-Element', () => {
    const expected = require('./fixtures/pagetitle.json')
    const wrapper = shallow(<PageTitle title={'Fooooooo uhhhh'} />)
    const actual = wrapper.find('h2').text()
    assert.equal(actual, expected.pageTitle)
  })


  it('<StateHandler /> should display content attribute', () => {
    const wrapper = shallow(<StateHandler content="Hello World" />)
    assert.equal(wrapper.instance().props.content, 'Hello World')
    assert.equal(wrapper.instance().state.content, 'Hello World')
  })

  it('<StateHandler /> should display default content', () => {
    const wrapper = shallow(<StateHandler />)
    assert.equal(wrapper.instance().props.content, 'default content')
    assert.equal(wrapper.instance().state.content, 'default content')
  })

})