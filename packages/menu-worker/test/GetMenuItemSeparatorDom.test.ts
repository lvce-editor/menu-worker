import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemSeparatorDom from '../src/parts/GetMenuItemSeparatorDom/GetMenuItemSeparatorDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemSeparatorDom returns array with two elements', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem)
  expect(result).toHaveLength(2)
})

test('getMenuItemSeparatorDom returns separator with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.MenuItemSeparator,
    role: AriaRoles.Separator,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemSeparatorDom returns separatorLine with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem)
  expect(result[1]).toEqual({
    childCount: 0,
    className: ClassNames.MenuItemSeparatorLine,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemSeparatorDom returns same result regardless of menuItem properties', () => {
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
  const result1 = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem1)
  const result2 = GetMenuItemSeparatorDom.getMenuItemSeparatorDom(menuItem2)
  expect(result1).toEqual(result2)
})
