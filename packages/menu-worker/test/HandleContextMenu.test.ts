import { expect, test } from '@jest/globals'
import type { MenuState } from '../src/parts/MenuState/MenuState.ts'
import * as HandleContextMenu from '../src/parts/HandleContextMenu/HandleContextMenu.ts'

const createMenuState = (): MenuState => {
  return {
    focusedIndex: 0,
    height: 0,
    isMenuOpen: false,
    labelFontFamily: '',
    labelFontSize: 0,
    labelFontWeight: 0,
    labelLetterSpacing: 0,
    labelPadding: 0,
    menus: [],
    titleBarEntries: [],
    titleBarHeight: 0,
    uid: 0,
    width: 0,
    x: 0,
    y: 0,
  }
}

test('handleContextMenu returns the same state', () => {
  const state = createMenuState()
  const result = HandleContextMenu.handleContextMenu(state)
  expect(result).toBe(state)
})

test('handleContextMenu returns state with different properties', () => {
  const state: MenuState = {
    focusedIndex: 5,
    height: 600,
    isMenuOpen: true,
    labelFontFamily: 'Arial',
    labelFontSize: 14,
    labelFontWeight: 400,
    labelLetterSpacing: 0.5,
    labelPadding: 10,
    menus: [],
    titleBarEntries: [],
    titleBarHeight: 30,
    uid: 1,
    width: 500,
    x: 100,
    y: 200,
  }
  const result = HandleContextMenu.handleContextMenu(state)
  expect(result).toBe(state)
  expect(result.uid).toBe(1)
  expect(result.focusedIndex).toBe(5)
  expect(result.isMenuOpen).toBe(true)
})
