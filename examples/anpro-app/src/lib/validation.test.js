import { areValidChars } from './validation'

describe('Input Validation Rules', () => {
  it('input "abc" are valid chars should to be true', () => {
    //Arrange
    const input = 'abc'

    //Act
    const actual = areValidChars(input)

    //Assert
    expect(actual).toBe(true)
  })

  it('input "abc1" are invalid chars and should to be false', () => {
    //Arrange
    const input = 'abc1'

    //Act
    const actual = areValidChars(input)

    //Assert
    expect(actual).toBe(false)
  })

  it('input "1abc" are invalid chars and should to be false', () => {
    //Arrange
    const input = '1abc'

    //Act
    const actual = areValidChars(input)

    //Assert
    expect(actual).toBe(false)
  })

  it('input "1abc1" are invalid chars and should to be false', () => {
    //Arrange
    const input = '1abc1'

    //Act
    const actual = areValidChars(input)

    //Assert
    expect(actual).toBe(false)
  })

  it('input "ab1c" are invalid chars and should to be false', () => {
    //Arrange
    const input = '1abc1'

    //Act
    const actual = areValidChars(input)

    //Assert
    expect(actual).toBe(false)
  })
})