import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemSeparatorDom from '../src/parts/GetMenuItemSeparatorDom/GetMenuItemSeparatorDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemSeparatorDom returns array with two elements', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem)
  expect(result).toHaveLength(2)
})

test('getMenuItemSeparatorDom returns separator with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.MenuItemSeparator,
    role: AriaRoles.Separator,
    childCount: 1,
  })
})

test('getMenuItemSeparatorDom returns separatorLine with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  }
  const result = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem)
  expect(result[1]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.MenuItemSeparatorLine,
    childCount: 0,
  })
})

test('getMenuItemSeparatorDom returns same result regardless of menuItem properties', () => {
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
  const result1 = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem1)
  const result2 = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem2)
  expect(result1).toEqual(result2)
})
