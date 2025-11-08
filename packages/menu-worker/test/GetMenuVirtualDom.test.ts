import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuVirtualDom from '../src/parts/GetMenuVirtualDom/GetMenuVirtualDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuVirtualDom returns menu container for empty array', () => {
  const menuItems: readonly VisibleMenuItem[] = []
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result).toHaveLength(1)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    childCount: 0,
  })
})

test('getMenuVirtualDom returns menu container with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    childCount: 1,
  })
})

test('getMenuVirtualDom includes menu items after container', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result.length).toBeGreaterThan(1)
})

test('getMenuVirtualDom childCount matches number of menu items', () => {
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
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem1, menuItem2]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result[0].childCount).toBe(2)
})

test('getMenuVirtualDom handles multiple menu items', () => {
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
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const menuItem3: VisibleMenuItem = {
    label: 'Third Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem1, menuItem2, menuItem3]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result[0].childCount).toBe(3)
  expect(result.length).toBeGreaterThan(3)
})

test('getMenuVirtualDom returns readonly array', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(Array.isArray(result)).toBe(true)
})
