import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemDisabledDom from '../src/parts/GetMenuItemDisabledDom/GetMenuItemDisabledDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemDisabledDom returns array with div and text', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)
  expect(result).toHaveLength(2)
})

test('getMenuItemDisabledDom returns div with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.MenuItem,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    disabled: true,
    childCount: 1,
  })
})

test('getMenuItemDisabledDom returns text node with correct label', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Test Item',
    childCount: 0,
  })
})

test('getMenuItemDisabledDom handles different labels', () => {
  const menuItem1: VisibleMenuItem = {
    label: 'First Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const menuItem2: VisibleMenuItem = {
    label: 'Second Item',
    flags: 2,
    isFocused: true,
    isExpanded: true,
    level: 1,
    key: 20,
  }
  const result1 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem1)
  const result2 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem2)
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

test('getMenuItemDisabledDom div properties are consistent regardless of menuItem properties', () => {
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
  const result1 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem1)
  const result2 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem2)
  expect(result1[0]).toEqual(result2[0])
})
