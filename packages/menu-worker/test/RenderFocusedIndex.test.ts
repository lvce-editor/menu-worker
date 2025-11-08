import { expect, test } from '@jest/globals'
import type { MenuState } from '../src/parts/MenuState/MenuState.ts'
import * as RenderFocusedIndex from '../src/parts/RenderFocusedIndex/RenderFocusedIndex.ts'

const createMenuState = (focusedIndex: number): MenuState => {
  return {
    uid: 0,
    titleBarEntries: [],
    focusedIndex,
    isMenuOpen: false,
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

test('renderFocusedIndex - returns empty array when focusedIndex is -1', () => {
  const oldState = createMenuState(0)
  const newState = createMenuState(-1)
  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)
  expect(result).toEqual([])
})

test('renderFocusedIndex - returns focus selector when focusedIndex is 0', () => {
  const oldState = createMenuState(-1)
  const newState = createMenuState(0)
  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)
  expect(result).toEqual(['Viewlet.focusSelector', '.ViewletTitleBarMenuBar'])
})

test('renderFocusedIndex - returns focus selector when focusedIndex is positive', () => {
  const oldState = createMenuState(0)
  const newState = createMenuState(5)
  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)
  expect(result).toEqual(['Viewlet.focusSelector', '.ViewletTitleBarMenuBar'])
})

test('renderFocusedIndex - returns focus selector when focusedIndex changes from -1 to positive', () => {
  const oldState = createMenuState(-1)
  const newState = createMenuState(2)
  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)
  expect(result).toEqual(['Viewlet.focusSelector', '.ViewletTitleBarMenuBar'])
})

test('renderFocusedIndex - returns empty array when focusedIndex changes to -1', () => {
  const oldState = createMenuState(3)
  const newState = createMenuState(-1)
  const result = RenderFocusedIndex.renderFocusedIndex(oldState, newState)
  expect(result).toEqual([])
})
