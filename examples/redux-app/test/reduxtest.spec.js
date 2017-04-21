import assert from 'assert'
import React from 'react'
import { mount, shallow } from 'enzyme'
import {greetingReducer} from '../src/components/HelloWorld/HelloWorldActionReducer'


describe('greetingReducer test', () => {

  it('greetingReducer UpdateGreeting mit klaus', () => {

    const reducer = greetingReducer('uschi', { 
        type: 'UPDATE_GREETING',
        greeting: 'klaus'
     })    
    assert.ok(reducer === 'klaus')    
  })

  it('greetingReducer UpdateGreeting mit uschi', () => {

    const reducer = greetingReducer('uschi', { 
        type: '',        
     })    
    assert.ok(reducer === 'uschi')    
  })

  it('greetingReducer Reset', () => {

    const reducer = greetingReducer('uschi', { 
        type: 'RESET_GREETING',       
         
     })    
    assert.ok(reducer === '')    
  })
 

})