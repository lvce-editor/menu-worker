import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemUncheckedDom from '../src/parts/GetMenuItemUncheckedDom/GetMenuItemUncheckedDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemUncheckedDom returns array with checkbox and text', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)
  expect(result).toHaveLength(2)
})

test('getMenuItemUncheckedDom returns checkbox with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.MenuItem,
    role: AriaRoles.MenuItemCheckBox,
    ariaChecked: false,
    tabIndex: -1,
    childCount: 1,
  })
})

test('getMenuItemUncheckedDom returns text node with correct label', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Test Item',
    childCount: 0,
  })
})

test('getMenuItemUncheckedDom handles different labels', () => {
  const menuItem1: VisibleMenuItem = {
    label: 'First Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const menuItem2: VisibleMenuItem = {
    label: 'Second Item',
    flags: 2,
    isFocused: true,
    isExpanded: true,
    level: 1,
    key: 20,
  }
  const result1 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem1)
  const result2 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem2)
  expect(result1[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'First Item',
    childCount: 0,
  })
  expect(result2[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Second Item',
    childCount: 0,
  })
})

test('getMenuItemUncheckedDom checkbox properties are consistent regardless of menuItem properties', () => {
  const menuItem1: VisibleMenuItem = {
    label: 'Item 1',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const menuItem2: VisibleMenuItem = {
    label: 'Item 2',
    flags: 2,
    isFocused: true,
    isExpanded: true,
    level: 2,
    key: 30,
  }
  const result1 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem1)
  const result2 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem2)
  expect(result1[0]).toEqual(result2[0])
})
