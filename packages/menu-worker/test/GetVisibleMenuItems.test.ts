import { expect, test } from '@jest/globals'
import * as GetVisibleMenuItems from '../src/parts/GetVisibleMenuItems/GetVisibleMenuItems.ts'

test('getVisible returns empty array for empty items', () => {
  const result = GetVisibleMenuItems.getVisible([], -1, false, 0)
  expect(result).toEqual([])
})

test('getVisible converts items to visible menu items', () => {
  const items = [
    { flags: 1, key: 10, label: 'Item 1' },
    { flags: 2, key: 20, label: 'Item 2' },
  ]
  const result = GetVisibleMenuItems.getVisible(items, -1, false, 0)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Item 1',
    level: 0,
  })
  expect(result[1]).toEqual({
    flags: 2,
    isExpanded: false,
    isFocused: false,
    key: 20,
    label: 'Item 2',
    level: 0,
  })
})

test('getVisible sets isFocused correctly', () => {
  const items = [
    { flags: 1, key: 10, label: 'Item 1' },
    { flags: 2, key: 20, label: 'Item 2' },
    { flags: 3, key: 30, label: 'Item 3' },
  ]
  const result = GetVisibleMenuItems.getVisible(items, 1, false, 0)
  expect(result[0].isFocused).toBe(false)
  expect(result[1].isFocused).toBe(true)
  expect(result[2].isFocused).toBe(false)
})

test('getVisible sets isExpanded only when focused and expanded is true', () => {
  const items = [
    { flags: 1, key: 10, label: 'Item 1' },
    { flags: 2, key: 20, label: 'Item 2' },
  ]
  const resultExpanded = GetVisibleMenuItems.getVisible(items, 1, true, 0)
  expect(resultExpanded[0].isExpanded).toBe(false)
  expect(resultExpanded[1].isExpanded).toBe(true)

  const resultNotExpanded = GetVisibleMenuItems.getVisible(items, 1, false, 0)
  expect(resultNotExpanded[0].isExpanded).toBe(false)
  expect(resultNotExpanded[1].isExpanded).toBe(false)
})

test('getVisible sets level correctly', () => {
  const items = [{ flags: 1, key: 10, label: 'Item 1' }]
  const result = GetVisibleMenuItems.getVisible(items, -1, false, 2)
  expect(result[0].level).toBe(2)
})

test('getVisible handles multiple items with different focus states', () => {
  const items = [
    { flags: 1, key: 10, label: 'Item 1' },
    { flags: 2, key: 20, label: 'Item 2' },
    { flags: 3, key: 30, label: 'Item 3' },
    { flags: 4, key: 40, label: 'Item 4' },
  ]
  const result = GetVisibleMenuItems.getVisible(items, 2, true, 1)
  expect(result).toHaveLength(4)
  expect(result[0]).toEqual({
    flags: 1,
    isExpanded: false,
    isFocused: false,
    key: 10,
    label: 'Item 1',
    level: 1,
  })
  expect(result[1]).toEqual({
    flags: 2,
    isExpanded: false,
    isFocused: false,
    key: 20,
    label: 'Item 2',
    level: 1,
  })
  expect(result[2]).toEqual({
    flags: 3,
    isExpanded: true,
    isFocused: true,
    key: 30,
    label: 'Item 3',
    level: 1,
  })
  expect(result[3]).toEqual({
    flags: 4,
    isExpanded: false,
    isFocused: false,
    key: 40,
    label: 'Item 4',
    level: 1,
  })
})

test('getVisible handles focusedIndex at first item', () => {
  const items = [
    { flags: 1, key: 10, label: 'Item 1' },
    { flags: 2, key: 20, label: 'Item 2' },
  ]
  const result = GetVisibleMenuItems.getVisible(items, 0, true, 0)
  expect(result[0].isFocused).toBe(true)
  expect(result[0].isExpanded).toBe(true)
  expect(result[1].isFocused).toBe(false)
  expect(result[1].isExpanded).toBe(false)
})

test('getVisible handles focusedIndex at last item', () => {
  const items = [
    { flags: 1, key: 10, label: 'Item 1' },
    { flags: 2, key: 20, label: 'Item 2' },
  ]
  const result = GetVisibleMenuItems.getVisible(items, 1, true, 0)
  expect(result[0].isFocused).toBe(false)
  expect(result[0].isExpanded).toBe(false)
  expect(result[1].isFocused).toBe(true)
  expect(result[1].isExpanded).toBe(true)
})
