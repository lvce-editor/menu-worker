import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemDisabledDom from '../src/parts/GetMenuItemDisabledDom/GetMenuItemDisabledDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemDisabledDom returns array with div and text', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)
  expect(result).toHaveLength(2)
})

test('getMenuItemDisabledDom returns div with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MenuItem,
    disabled: true,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemDisabledDom returns text node with correct label', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem)
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'Test Item',
    type: VirtualDomElements.Text,
  })
})

test('getMenuItemDisabledDom handles different labels', () => {
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
    isExpanded: true,
    isFocused: true,
    key: 20,
    label: 'Second Item',
    level: 1,
  }
  const result1 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem1)
  const result2 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem2)
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

test('getMenuItemDisabledDom div properties are consistent regardless of menuItem properties', () => {
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
  const result1 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem1)
  const result2 = GetMenuItemDisabledDom.getMenuItemDisabledDom(menuItem2)
  expect(result1[0]).toEqual(result2[0])
})
