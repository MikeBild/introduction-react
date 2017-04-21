import assert from 'assert'
import React from 'react'
import { mount, shallow } from 'enzyme'
import {questionnaireInitReducer} from '../src/pages/QuestionnaireActionReducer'
import {questionnaireIncrementReducer} from '../src/pages/QuestionnaireActionReducer'


describe('questionnaireInitReducer test', () => {

  it('questionnaireInitReducer GetData', () => {

    const reducer = questionnaireInitReducer({}, { 
        type: 'QUESTIONS_LOADED',
        questionnaireData: { 
            'Frage A' : '',
            'Frage B' : ''
        }
     })    
    assert.deepEqual(reducer, { 
            'Frage A' : '',
            'Frage B' : ''
        })    
  }) 

  it('questionnaireInitReducer Increment', () => {
    let valToIncrement = 1
    const reducer = questionnaireIncrementReducer(valToIncrement, { 
        type: 'INCREMENT'        
     })    
    assert.ok(reducer, valToIncrement+=1)    
  }) 
 

})