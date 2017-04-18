import assert from 'assert'
import React from 'react'
import { mount, shallow } from 'enzyme'

import HelloWorld from '../src/components/HelloWorld/HelloWorld'

describe('A Redux-React-Component test', () => {

  it('<HelloWorld /> should do ..', () => {
    const wrapper = shallow(<HelloWorld />)
    assert.ok(wrapper.find('h1').length)
  })

})