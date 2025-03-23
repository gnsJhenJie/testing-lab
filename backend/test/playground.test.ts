import { describe, test, expect, it } from 'vitest'
import { myCustomAdd, fabonacci } from '../src/utils/math'
import { fail } from 'assert'
import fc from 'fast-check'

describe('my testing playground', () => {
  test('it works', () => {
    const expected = true
    const actual = true
    expect(actual).toBe(expected)
  })

  describe('add function testing', () => {
    it('should return 3 when add 1 and 2', () => {
      // Arrange

      // Act
      const result = myCustomAdd(1, 2)

      // Assert
      expect(result).toBe(3)
    })
    it('should return 5 when add 2 and 3', () => {
      // TODO: fix the test
      // Arrange

      // Act
      const result = myCustomAdd(2, 3)

      // Assert
      expect(result).toBe(5)
    })
  })

  describe('fabonacci testing', () => {
    it('should return 1 when n is 1', () => {
      expect(fabonacci(1)).toBe(1)
    })
    it('should return 1 when n is 2', () => {
      // TODO: fix the test
      // Arrange

      // Act
      const result = fabonacci(2)

      // Assert
      expect(result).toBe(1)
    })
    it('should return 2 when n is 3', () => {
      // TODO: fix the test
      // Arrange

      // Act
      const result = fabonacci(3)

      // Assert
      expect(result).toBe(2)
    })
  })

  describe('fast-check testing', () => {
    it('should pass', () => {
      fc.assert(fc.property(fc.integer(), fc.integer(), (a, b) => {
        expect(myCustomAdd(a, b)).toBe(a + b)
      }))
    })
  })

})
