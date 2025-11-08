import { expect, test } from '@jest/globals'
import type { MenuState } from '../src/parts/MenuState/MenuState.ts'
import * as DiffFocusedIndex from '../src/parts/DiffFocusedIndex/DiffFocusedIndex.ts'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'

const createMenuState = (focusedIndex: number, isMenuOpen: boolean): MenuState => {
  return {
    uid: 0,
    titleBarEntries: [],
    focusedIndex,
    isMenuOpen,
    menus: [],
    labelFontWeight: 0,
    labelFontFamily: '',
    labelFontSize: 0,
    labelPadding: 0,
    labelLetterSpacing: 0,
    titleBarHeight: 0,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
}

test('diffType', () => {
  expect(DiffFocusedIndex.diffType).toBe(DiffType.RenderFocusedIndex)
})

test('isEqual - same focusedIndex and isMenuOpen', () => {
  const oldState = createMenuState(0, false)
  const newState = createMenuState(0, false)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(true)
})

test('isEqual - different focusedIndex', () => {
  const oldState = createMenuState(0, false)
  const newState = createMenuState(1, false)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(false)
})

test('isEqual - different isMenuOpen', () => {
  const oldState = createMenuState(0, false)
  const newState = createMenuState(0, true)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(false)
})

test('isEqual - both different', () => {
  const oldState = createMenuState(0, false)
  const newState = createMenuState(1, true)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(false)
})

test('isEqual - same focusedIndex and isMenuOpen with different values', () => {
  const oldState = createMenuState(5, true)
  const newState = createMenuState(5, true)
  expect(DiffFocusedIndex.isEqual(oldState, newState)).toBe(true)
})
