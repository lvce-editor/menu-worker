import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as GetMenuItemNoopDom from '../src/parts/GetMenuItemNoopDom/GetMenuItemNoopDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemsNoopDom returns div with unsupported text', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  expect(result).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Unsupport menu item type',
      type: VirtualDomElements.Text,
    },
  ])
  expect(result.length).toBe(2)
})

test('getMenuItemsNoopDom returns div with unsupported text regardless of menuItem properties', () => {
  const menuItem1: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'First Item',
    level: 0,
  }
  const menuItem2: VisibleMenuItem = {
    flags: 999,
    isExpanded: true,
    isFocused: true,
    key: 42,
    label: 'Second Item',
    level: 5,
  }
  const result1 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem1)
  const result2 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem2)
  expect(result1).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Unsupport menu item type',
      type: VirtualDomElements.Text,
    },
  ])
  expect(result2).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Unsupport menu item type',
      type: VirtualDomElements.Text,
    },
  ])
  expect(result1.length).toBe(2)
  expect(result2.length).toBe(2)
})

test('getMenuItemsNoopDom returns div with unsupported text for empty label', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: '',
    level: 0,
  }
  const result = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  expect(result).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Unsupport menu item type',
      type: VirtualDomElements.Text,
    },
  ])
})

test('getMenuItemsNoopDom always returns same structure', () => {
  const menuItem: VisibleMenuItem = {
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Test Item',
    level: 0,
  }
  const result1 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  const result2 = GetMenuItemNoopDom.getMenuItemsNoopDom(menuItem)
  expect(result1).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Unsupport menu item type',
      type: VirtualDomElements.Text,
    },
  ])
  expect(result2).toEqual([
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    {
      childCount: 0,
      text: 'Unsupport menu item type',
      type: VirtualDomElements.Text,
    },
  ])
})
