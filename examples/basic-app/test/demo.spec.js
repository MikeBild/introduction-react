const assert = require('assert')
//import assert from 'assert'

describe('A test group', () => {
  const mySuperDuper = require('../lib/mySuperDuper').default
  let sut = undefined

  before(() => {
    sut = mySuperDuper()
  })

  after(() => {
    sut = undefined
  })

  it('A unit test as callback', done => {
    //Arrange
    sut.init(2)
    //Act
    sut.add(undefined, (error, actual) => {
      //Assert
      assert.equal(actual, 6)
      done()
    })
  })

  it('A unit test as Promise', () => {
    //Arrange
    sut.init(2)
    //Act
    return sut
    .addAsPromise(undefined)
    .then(actual => {
      //Assert
      assert.equal(actual, 6)
    })
  })

})