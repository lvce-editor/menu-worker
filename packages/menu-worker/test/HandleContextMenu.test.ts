import { expect, test } from '@jest/globals'
import type { MenuState } from '../src/parts/MenuState/MenuState.ts'
import * as HandleContextMenu from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

const createMenuState = (): MenuState => {
  return {
    uid: 0,
    titleBarEntries: [],
    focusedIndex: 0,
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

test('handleContextMenu returns the same state', () => {
  const state = createMenuState()
  const result = HandleContextMenu.handleContextMenu(state)
  expect(result).toBe(state)
})

test('handleContextMenu returns state with different properties', () => {
  const state: MenuState = {
    uid: 1,
    titleBarEntries: [],
    focusedIndex: 5,
    isMenuOpen: true,
    menus: [],
    labelFontWeight: 400,
    labelFontFamily: 'Arial',
    labelFontSize: 14,
    labelPadding: 10,
    labelLetterSpacing: 0.5,
    titleBarHeight: 30,
    x: 100,
    y: 200,
    width: 500,
    height: 600,
  }
  const result = HandleContextMenu.handleContextMenu(state)
  expect(result).toBe(state)
  expect(result.uid).toBe(1)
  expect(result.focusedIndex).toBe(5)
  expect(result.isMenuOpen).toBe(true)
})
