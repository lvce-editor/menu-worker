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
    childCount: 0,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuVirtualDom returns menu container with correct properties', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result[0]).toEqual({
    childCount: 1,
    className: ClassNames.Menu,
    role: AriaRoles.Menu,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
})

test('getMenuVirtualDom includes menu items after container', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result.length).toBeGreaterThan(1)
})

test('getMenuVirtualDom childCount matches number of menu items', () => {
  const menuItem1: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'First Item',
    level: 0,
  }
  const menuItem2: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Second Item',
    level: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem1, menuItem2]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result[0].childCount).toBe(2)
})

test('getMenuVirtualDom handles multiple menu items', () => {
  const menuItem1: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'First Item',
    level: 0,
  }
  const menuItem2: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Second Item',
    level: 0,
  }
  const menuItem3: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Third Item',
    level: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem1, menuItem2, menuItem3]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(result[0].childCount).toBe(3)
  expect(result.length).toBeGreaterThan(3)
})

test('getMenuVirtualDom returns readonly array', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const menuItems: readonly VisibleMenuItem[] = [menuItem]
  const result = GetMenuVirtualDom.getMenuVirtualDom(menuItems)
  expect(Array.isArray(result)).toBe(true)
})
