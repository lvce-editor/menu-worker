import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemVirtualDom from '../src/parts/GetMenuItemVirtualDom/GetMenuItemVirtualDom.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuItemVirtualDom returns default dom for None flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.None,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns separator dom for Separator flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.Separator,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: '',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(2)
})

test('getMenuItemVirtualDom returns checked dom for Checked flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.Checked,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Checked Item',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns unchecked dom for Unchecked flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.Unchecked,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Unchecked Item',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns disabled dom for Disabled flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.Disabled,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Disabled Item',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns submenu dom for SubMenu flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.SubMenu,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'SubMenu Item',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns default dom for RestoreFocus flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.RestoreFocus,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Restore Focus Item',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns default dom for Ignore flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.Ignore,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Ignore Item',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns noop dom for unknown flag', () => {
  const menuItem: VisibleMenuItem = {
    flags: 999,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Unknown Item',
    level: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
})

test('getMenuItemVirtualDom passes menuItem to renderer', () => {
  const menuItem: VisibleMenuItem = {
    flags: MenuItemFlags.None,
    isExpanded: true,
    isFocused: true,
    key: 42,
    label: 'Test Item',
    level: 2,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
})
