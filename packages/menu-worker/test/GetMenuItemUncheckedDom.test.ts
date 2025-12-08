import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemUncheckedDom from '../src/parts/GetMenuItemUncheckedDom/GetMenuItemUncheckedDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemUncheckedDom returns array with checkbox and text', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)
  expect(result).toHaveLength(2)
})

test('getMenuItemUncheckedDom returns checkbox with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)
  expect(result[0]).toEqual({
    ariaChecked: false,
    childCount: 1,
    className: ClassNames.MenuItem,
    role: AriaRoles.MenuItemCheckBox,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemUncheckedDom returns text node with correct label', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem)
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'Test Item',
    type: VirtualDomElements.Text,
  })
})

test('getMenuItemUncheckedDom handles different labels', () => {
  const menuItem1: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'First Item',
    level: 0,
  }
  const menuItem2: VisibleMenuItem = {
    flags: 2,
    isExpanded: true,
    isFocused: true,
    key: 20,
    label: 'Second Item',
    level: 1,
  }
  const result1 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem1)
  const result2 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem2)
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

test('getMenuItemUncheckedDom checkbox properties are consistent regardless of menuItem properties', () => {
  const menuItem1: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Item 1',
    level: 0,
  }
  const menuItem2: VisibleMenuItem = {
    flags: 2,
    isExpanded: true,
    isFocused: true,
    key: 30,
    label: 'Item 2',
    level: 2,
  }
  const result1 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem1)
  const result2 = GetMenuItemUncheckedDom.getMenuItemUncheckedDom(menuItem2)
  expect(result1[0]).toEqual(result2[0])
})
