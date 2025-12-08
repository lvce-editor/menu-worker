import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemDefaultDom from '../src/parts/GetMenuItemDefaultDom/GetMenuItemDefaultDom.ts'
import * as KeyCode from '../src/parts/KeyCode/KeyCode.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemDefaultDom returns array with div and text for basic menu item', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)
  expect(result).toHaveLength(2)
})

test('getMenuItemDefaultDom returns div with correct properties for unfocused item', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MenuItem,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemDefaultDom returns div with focused class when isFocused is true', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: true,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)
  expect(result[0]).toEqual({
    childCount: 1,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemFocused}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemDefaultDom returns text node with correct label', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'Test Item',
    type: VirtualDomElements.Text,
  })
})

test('getMenuItemDefaultDom includes key binding when key is provided', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: KeyCode.Enter,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)
  expect(result).toHaveLength(4)
  expect(result[0].childCount).toBe(2)
  expect(result[2]).toEqual({
    childCount: 1,
    className: ClassNames.MenuItemKeyBinding,
    type: VirtualDomElements.Span,
  })
  expect(result[3].type).toBe(VirtualDomElements.Text)
})

test('getMenuItemDefaultDom includes key binding with focus', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: true,
    key: KeyCode.Enter,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)
  expect(result).toHaveLength(4)
  expect(result[0].className).toBe(`${ClassNames.MenuItem} ${ClassNames.MenuItemFocused}`)
  expect(result[0].childCount).toBe(2)
})

test('getMenuItemDefaultDom handles different labels', () => {
  const menuItem1: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'First Item',
    level: 0,
  }
  const menuItem2: VisibleMenuItem = {
    flags: 2,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Second Item',
    level: 0,
  }
  const result1 = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem1)
  const result2 = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem2)
  expect(result1[1]).toEqual({
    childCount: 0,
    text: 'First Item',
    type: VirtualDomElements.Text,
  })
  expect(result2[1]).toEqual({
    childCount: 0,
    text: 'Second Item',
    type: VirtualDomElements.Text,
  })
})

test('getMenuItemDefaultDom does not include key binding when key is 0', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDefaultDom.getMenuItemDefaultDom(menuItem)
  expect(result).toHaveLength(2)
  expect(result[0].childCount).toBe(1)
})
