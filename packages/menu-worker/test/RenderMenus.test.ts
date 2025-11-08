import { expect, test } from '@jest/globals'
import type { MenuState } from '../src/parts/MenuState/MenuState.ts'
import * as RenderMenus from '../src/parts/RenderMenus/RenderMenus.ts'
import * as RenderMethod from '../src/parts/RenderMethod/RenderMethod.ts'

const createMenuState = (menus: readonly any[], uid: number = 0): MenuState => {
  return {
    uid,
    titleBarEntries: [],
    focusedIndex: 0,
    isMenuOpen: false,
    menus,
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

const createMenu = (items: readonly any[], focusedIndex: number = -1, expanded: boolean = false, level: number = 0): any => {
  return {
    items,
    focusedIndex,
    expanded,
    level,
  }
}

test('renderMenus returns Viewlet.send with no changes when menus are identical', () => {
  const menu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const oldState = createMenuState([menu])
  const newState = createMenuState([menu])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result).toEqual(['Viewlet.send', 0, RenderMethod.SetMenus, [], 0])
})

test('renderMenus returns updateMenu change when menu is different', () => {
  const oldMenu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const newMenu = createMenu([{ label: 'Item 2', flags: 2, key: 20 }])
  const oldState = createMenuState([oldMenu])
  const newState = createMenuState([newMenu])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[0]).toBe('Viewlet.send')
  expect(result[1]).toBe(0)
  expect(result[2]).toBe(RenderMethod.SetMenus)
  expect(result[3]).toHaveLength(1)
  expect(result[3][0][0]).toBe('updateMenu')
  expect(result[3][0][1]).toBe(newMenu)
  expect(result[3][0][2]).toBe(1)
  expect(result[4]).toBe(0)
})

test('renderMenus returns addMenu change when new menu is added', () => {
  const menu1 = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const menu2 = createMenu([{ label: 'Item 2', flags: 2, key: 20 }])
  const oldState = createMenuState([menu1])
  const newState = createMenuState([menu1, menu2])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(1)
  expect(result[3][0][0]).toBe('addMenu')
  expect(result[3][0][1]).toBe(menu2)
})

test('renderMenus returns closeMenus change when menus are removed', () => {
  const menu1 = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const menu2 = createMenu([{ label: 'Item 2', flags: 2, key: 20 }])
  const oldState = createMenuState([menu1, menu2])
  const newState = createMenuState([menu1])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(1)
  expect(result[3][0][0]).toBe('closeMenus')
  expect(result[3][0][1]).toBe(1)
})

test('renderMenus returns both updateMenu and addMenu when menu is updated and new menu is added', () => {
  const oldMenu1 = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const newMenu1 = createMenu([{ label: 'Item 1 Updated', flags: 1, key: 10 }])
  const newMenu2 = createMenu([{ label: 'Item 2', flags: 2, key: 20 }])
  const oldState = createMenuState([oldMenu1])
  const newState = createMenuState([newMenu1, newMenu2])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(2)
  expect(result[3][0][0]).toBe('updateMenu')
  expect(result[3][0][1]).toBe(newMenu1)
  expect(result[3][1][0]).toBe('addMenu')
  expect(result[3][1][1]).toBe(newMenu2)
})

test('renderMenus returns multiple updateMenu changes when multiple menus are updated', () => {
  const oldMenu1 = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const oldMenu2 = createMenu([{ label: 'Item 2', flags: 2, key: 20 }])
  const newMenu1 = createMenu([{ label: 'Item 1 Updated', flags: 1, key: 10 }])
  const newMenu2 = createMenu([{ label: 'Item 2 Updated', flags: 2, key: 20 }])
  const oldState = createMenuState([oldMenu1, oldMenu2])
  const newState = createMenuState([newMenu1, newMenu2])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(2)
  expect(result[3][0][0]).toBe('updateMenu')
  expect(result[3][0][1]).toBe(newMenu1)
  expect(result[3][1][0]).toBe('updateMenu')
  expect(result[3][1][1]).toBe(newMenu2)
})

test('renderMenus returns updateMenu and closeMenus when menu is updated and menus are removed', () => {
  const oldMenu1 = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const oldMenu2 = createMenu([{ label: 'Item 2', flags: 2, key: 20 }])
  const newMenu1 = createMenu([{ label: 'Item 1 Updated', flags: 1, key: 10 }])
  const oldState = createMenuState([oldMenu1, oldMenu2])
  const newState = createMenuState([newMenu1])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(2)
  expect(result[3][0][0]).toBe('updateMenu')
  expect(result[3][0][1]).toBe(newMenu1)
  expect(result[3][1][0]).toBe('closeMenus')
  expect(result[3][1][1]).toBe(1)
})

test('renderMenus handles empty menus array', () => {
  const oldState = createMenuState([])
  const newState = createMenuState([])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result).toEqual(['Viewlet.send', 0, RenderMethod.SetMenus, [], 0])
})

test('renderMenus uses newState uid in result', () => {
  const menu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const oldState = createMenuState([menu], 1)
  const newState = createMenuState([menu], 2)
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[1]).toBe(2)
  expect(result[4]).toBe(2)
})

test('renderMenus handles menu with different focusedIndex', () => {
  const oldMenu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }], -1, false, 0)
  const newMenu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }], 0, false, 0)
  const oldState = createMenuState([oldMenu])
  const newState = createMenuState([newMenu])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(1)
  expect(result[3][0][0]).toBe('updateMenu')
})

test('renderMenus handles menu with different expanded state', () => {
  const oldMenu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }], 0, false, 0)
  const newMenu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }], 0, true, 0)
  const oldState = createMenuState([oldMenu])
  const newState = createMenuState([newMenu])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(1)
  expect(result[3][0][0]).toBe('updateMenu')
})

test('renderMenus handles menu with different level', () => {
  const oldMenu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }], -1, false, 0)
  const newMenu = createMenu([{ label: 'Item 1', flags: 1, key: 10 }], -1, false, 1)
  const oldState = createMenuState([oldMenu])
  const newState = createMenuState([newMenu])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(1)
  expect(result[3][0][0]).toBe('updateMenu')
})

test('renderMenus handles removing multiple menus', () => {
  const menu1 = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const menu2 = createMenu([{ label: 'Item 2', flags: 2, key: 20 }])
  const menu3 = createMenu([{ label: 'Item 3', flags: 3, key: 30 }])
  const oldState = createMenuState([menu1, menu2, menu3])
  const newState = createMenuState([menu1])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(1)
  expect(result[3][0][0]).toBe('closeMenus')
  expect(result[3][0][1]).toBe(1)
})

test('renderMenus handles adding multiple menus', () => {
  const menu1 = createMenu([{ label: 'Item 1', flags: 1, key: 10 }])
  const menu2 = createMenu([{ label: 'Item 2', flags: 2, key: 20 }])
  const menu3 = createMenu([{ label: 'Item 3', flags: 3, key: 30 }])
  const oldState = createMenuState([menu1])
  const newState = createMenuState([menu1, menu2, menu3])
  const result = RenderMenus.renderMenus(oldState, newState)
  expect(result[3]).toHaveLength(1)
  expect(result[3][0][0]).toBe('addMenu')
  expect(result[3][0][1]).toBe(menu3)
})
