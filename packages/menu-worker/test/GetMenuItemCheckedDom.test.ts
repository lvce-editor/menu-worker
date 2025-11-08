import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemCheckedDom from '../src/parts/GetMenuItemCheckedDom/GetMenuItemCheckedDom.ts'
import * as MergeClassNames from '../src/parts/MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemCheckedDom returns array with checkbox, checkmark, and text', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)
  expect(result).toHaveLength(3)
})

test('getMenuItemCheckedDom returns checkbox with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: MergeClassNames.mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemCheckMark),
    role: AriaRoles.MenuItemCheckBox,
    ariaChecked: true,
    tabIndex: -1,
    childCount: 2,
  })
})

test('getMenuItemCheckedDom returns checkmark with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: MergeClassNames.mergeClassNames(ClassNames.MenuItemCheckmarkIcon, ClassNames.MaskIconCheck),
  })
})

test('getMenuItemCheckedDom returns text node with correct label', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem)
  expect(result[2]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Test Item',
    childCount: 0,
  })
})

test('getMenuItemCheckedDom handles different labels', () => {
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
  const result1 = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem1)
  const result2 = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem2)
  expect(result1[2]).toEqual({
    type: VirtualDomElements.Text,
    text: 'First Item',
    childCount: 0,
  })
  expect(result2[2]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Second Item',
    childCount: 0,
  })
})

test('getMenuItemCheckedDom checkbox and checkmark properties are consistent regardless of menuItem properties', () => {
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
  const result1 = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem1)
  const result2 = GetMenuItemCheckedDom.getMenuItemCheckedDom(menuItem2)
  expect(result1[0]).toEqual(result2[0])
  expect(result1[1]).toEqual(result2[1])
})
