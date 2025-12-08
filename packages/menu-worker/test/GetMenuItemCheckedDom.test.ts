import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemCheckedDom from '../src/parts/GetMenuItemCheckedDom/GetMenuItemCheckedDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemCheckedDom returns array with checkbox, checkmark, and text', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)
  expect(result).toHaveLength(3)
})

test('getMenuItemCheckedDom returns checkbox with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)
  expect(result[0]).toEqual({
    ariaChecked: true,
    childCount: 2,
    className: MergeClassNames.mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemCheckMark),
    role: AriaRoles.MenuItemCheckBox,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemCheckedDom returns checkmark with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)
  expect(result[1]).toEqual({
    className: MergeClassNames.mergeClassNames(ClassNames.MenuItemCheckmarkIcon, ClassNames.MaskIconCheck),
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemCheckedDom returns text node with correct label', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)
  expect(result[2]).toEqual({
    childCount: 0,
    text: 'Test Item',
    type: VirtualDomElements.Text,
  })
})

test('getMenuItemCheckedDom handles different labels', () => {
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
  const result1 = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem1)
  const result2 = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem2)
  expect(result1[2]).toEqual({
    childCount: 0,
    text: 'First Item',
    type: VirtualDomElements.Text,
  })
  expect(result2[2]).toEqual({
    childCount: 0,
    text: 'Second Item',
    type: VirtualDomElements.Text,
  })
})

test('getMenuItemCheckedDom checkbox and checkmark properties are consistent regardless of menuItem properties', () => {
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
  const result1 = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem1)
  const result2 = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem2)
  expect(result1[0]).toEqual(result2[0])
  expect(result1[1]).toEqual(result2[1])
})
