import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemNoopDom from '../src/parts/GetMenuItemNoopDom/GetMenuItemNoopDom.ts'

test('getMenuItemsNoopDom returns empty array', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  expect(result).toEqual([])
  expect(result.length).toBe(0)
})

test('getMenuItemsNoopDom returns empty array regardless of menuItem properties', () => {
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
    flags: 999,
    isFocused: true,
    isExpanded: true,
    level: 5,
    key: 42,
  }
  const result1 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem1)
  const result2 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem2)
  expect(result1).toEqual([])
  expect(result2).toEqual([])
  expect(result1.length).toBe(0)
  expect(result2.length).toBe(0)
})

test('getMenuItemsNoopDom returns empty array for empty label', () => {
  const menuItem: VisibleMenuItem = {
    label: '',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  expect(result).toEqual([])
})

test('getMenuItemsNoopDom always returns same empty array reference', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Test Item',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result1 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  const result2 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  expect(result1).toEqual([])
  expect(result2).toEqual([])
})
