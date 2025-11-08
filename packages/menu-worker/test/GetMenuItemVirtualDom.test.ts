import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemVirtualDom from '../src/parts/GetMenuItemVirtualDom/GetMenuItemVirtualDom.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuItemVirtualDom returns default dom for None flag', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: MenuItemFlags.None,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns separator dom for Separator flag', () => {
  const menuItem: VisibleMenuItem = {
    label: '',
    flags: MenuItemFlags.Separator,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBe(2)
})

test('getMenuItemVirtualDom returns checked dom for Checked flag', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Checked Item',
    flags: MenuItemFlags.Checked,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns unchecked dom for Unchecked flag', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Unchecked Item',
    flags: MenuItemFlags.Unchecked,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns disabled dom for Disabled flag', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Disabled Item',
    flags: MenuItemFlags.Disabled,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns submenu dom for SubMenu flag', () => {
  const menuItem: VisibleMenuItem = {
    label: 'SubMenu Item',
    flags: MenuItemFlags.SubMenu,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns default dom for RestoreFocus flag', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Restore Focus Item',
    flags: MenuItemFlags.RestoreFocus,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns default dom for Ignore flag', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Ignore Item',
    flags: MenuItemFlags.Ignore,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
  expect(result.length).toBeGreaterThan(0)
})

test('getMenuItemVirtualDom returns noop dom for unknown flag', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Unknown Item',
    flags: 999,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
})

test('getMenuItemVirtualDom passes menuItem to renderer', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: MenuItemFlags.None,
    isFocused: true,
    isExpanded: true,
    level: 2,
    key: 42,
  }
  const result = GetMenuItemVirtualDom.getMenuItemVirtualDom(menuItem)
  expect(result).toBeDefined()
  expect(Array.isArray(result)).toBe(true)
})
