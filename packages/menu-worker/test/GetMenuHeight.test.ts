import { expect, test } from '@jest/globals'
import * as GetMenuHeight from '../src/parts/GetMenuHeight/GetMenuHeight.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('getMenuHeight - empty array returns padding only', () => {
  const result = GetMenuHeight.getMenuHeight([])
  expect(result).toBe(8)
})

test('getMenuHeight - single regular item', () => {
  const items = [{ flags: MenuItemFlags.None }]
  const result = GetMenuHeight.getMenuHeight(items)
  expect(result).toBe(34)
})

test('getMenuHeight - single separator', () => {
  const items = [{ flags: MenuItemFlags.Separator }]
  const result = GetMenuHeight.getMenuHeight(items)
  expect(result).toBe(19)
})

test('getMenuHeight - multiple regular items', () => {
  const items = [{ flags: MenuItemFlags.None }, { flags: MenuItemFlags.Checked }, { flags: MenuItemFlags.Unchecked }]
  const result = GetMenuHeight.getMenuHeight(items)
  expect(result).toBe(86)
})

test('getMenuHeight - multiple separators', () => {
  const items = [{ flags: MenuItemFlags.Separator }, { flags: MenuItemFlags.Separator }]
  const result = GetMenuHeight.getMenuHeight(items)
  expect(result).toBe(30)
})

test('getMenuHeight - mixed items', () => {
  const items = [
    { flags: MenuItemFlags.None },
    { flags: MenuItemFlags.Separator },
    { flags: MenuItemFlags.Checked },
    { flags: MenuItemFlags.Separator },
    { flags: MenuItemFlags.Unchecked },
  ]
  const result = GetMenuHeight.getMenuHeight(items)
  expect(result).toBe(108)
})

test('getMenuHeight - submenu item', () => {
  const items = [{ flags: MenuItemFlags.SubMenu }]
  const result = GetMenuHeight.getMenuHeight(items)
  expect(result).toBe(34)
})

test('getMenuHeight - disabled item', () => {
  const items = [{ flags: MenuItemFlags.Disabled }]
  const result = GetMenuHeight.getMenuHeight(items)
  expect(result).toBe(34)
})
