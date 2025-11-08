import { expect, test } from '@jest/globals'
import * as GetVisibleMenuItems from '../src/parts/GetVisibleMenuItems/GetVisibleMenuItems.ts'

test('getVisible returns empty array for empty items', () => {
  const result = GetVisibleMenuItems.getVisible([], -1, false, 0)
  expect(result).toEqual([])
})

test('getVisible converts items to visible menu items', () => {
  const items = [
    { label: 'Item 1', flags: 1, key: 10 },
    { label: 'Item 2', flags: 2, key: 20 },
  ]
  const result = GetVisibleMenuItems.getVisible(items, -1, false, 0)
  expect(result).toHaveLength(2)
  expect(result[0]).toEqual({
    label: 'Item 1',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 10,
  })
  expect(result[1]).toEqual({
    label: 'Item 2',
    flags: 2,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 20,
  })
})

test('getVisible sets isFocused correctly', () => {
  const items = [
    { label: 'Item 1', flags: 1, key: 10 },
    { label: 'Item 2', flags: 2, key: 20 },
    { label: 'Item 3', flags: 3, key: 30 },
  ]
  const result = GetVisibleMenuItems.getVisible(items, 1, false, 0)
  expect(result[0].isFocused).toBe(false)
  expect(result[1].isFocused).toBe(true)
  expect(result[2].isFocused).toBe(false)
})

test('getVisible sets isExpanded only when focused and expanded is true', () => {
  const items = [
    { label: 'Item 1', flags: 1, key: 10 },
    { label: 'Item 2', flags: 2, key: 20 },
  ]
  const resultExpanded = GetVisibleMenuItems.getVisible(items, 1, true, 0)
  expect(resultExpanded[0].isExpanded).toBe(false)
  expect(resultExpanded[1].isExpanded).toBe(true)

  const resultNotExpanded = GetVisibleMenuItems.getVisible(items, 1, false, 0)
  expect(resultNotExpanded[0].isExpanded).toBe(false)
  expect(resultNotExpanded[1].isExpanded).toBe(false)
})

test('getVisible sets level correctly', () => {
  const items = [{ label: 'Item 1', flags: 1, key: 10 }]
  const result = GetVisibleMenuItems.getVisible(items, -1, false, 2)
  expect(result[0].level).toBe(2)
})

test('getVisible handles multiple items with different focus states', () => {
  const items = [
    { label: 'Item 1', flags: 1, key: 10 },
    { label: 'Item 2', flags: 2, key: 20 },
    { label: 'Item 3', flags: 3, key: 30 },
    { label: 'Item 4', flags: 4, key: 40 },
  ]
  const result = GetVisibleMenuItems.getVisible(items, 2, true, 1)
  expect(result).toHaveLength(4)
  expect(result[0]).toEqual({
    label: 'Item 1',
    flags: 1,
    isFocused: false,
    isExpanded: false,
    level: 1,
    key: 10,
  })
  expect(result[1]).toEqual({
    label: 'Item 2',
    flags: 2,
    isFocused: false,
    isExpanded: false,
    level: 1,
    key: 20,
  })
  expect(result[2]).toEqual({
    label: 'Item 3',
    flags: 3,
    isFocused: true,
    isExpanded: true,
    level: 1,
    key: 30,
  })
  expect(result[3]).toEqual({
    label: 'Item 4',
    flags: 4,
    isFocused: false,
    isExpanded: false,
    level: 1,
    key: 40,
  })
})

test('getVisible handles focusedIndex at first item', () => {
  const items = [
    { label: 'Item 1', flags: 1, key: 10 },
    { label: 'Item 2', flags: 2, key: 20 },
  ]
  const result = GetVisibleMenuItems.getVisible(items, 0, true, 0)
  expect(result[0].isFocused).toBe(true)
  expect(result[0].isExpanded).toBe(true)
  expect(result[1].isFocused).toBe(false)
  expect(result[1].isExpanded).toBe(false)
})

test('getVisible handles focusedIndex at last item', () => {
  const items = [
    { label: 'Item 1', flags: 1, key: 10 },
    { label: 'Item 2', flags: 2, key: 20 },
  ]
  const result = GetVisibleMenuItems.getVisible(items, 1, true, 0)
  expect(result[0].isFocused).toBe(false)
  expect(result[0].isExpanded).toBe(false)
  expect(result[1].isFocused).toBe(true)
  expect(result[1].isExpanded).toBe(true)
})
