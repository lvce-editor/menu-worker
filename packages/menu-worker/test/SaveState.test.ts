import { expect, test } from '@jest/globals'
import * as SaveState from '../src/parts/SaveState/SaveState.ts'

test('saveState returns SavedState with x: 1', () => {
  const result = SaveState.saveState(1)
  expect(result).toEqual({ x: 1 })
})

test('saveState returns SavedState with x: 1 for different uid values', () => {
  const result1 = SaveState.saveState(0)
  const result2 = SaveState.saveState(100)
  const result3 = SaveState.saveState(-1)
  expect(result1).toEqual({ x: 1 })
  expect(result2).toEqual({ x: 1 })
  expect(result3).toEqual({ x: 1 })
})
