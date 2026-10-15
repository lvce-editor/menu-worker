import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/GetMenuMeasuredWidth/GetMenuMeasuredWidth.ts', () => {
  return {
    getMenuMeasuredWidth: jest.fn(() => 150),
  }
})

const GetMenuBounds = await import('../src/parts/GetMenuBounds/GetMenuBounds.ts')

const viewport = { x: 600, y: 80, width: 500, height: 400 }
const items = [{ label: 'Sign Out' }]

test('keeps a menu beside its target within the owning viewport', async () => {
  expect(await GetMenuBounds.getMenuBounds(700, 120, items, false, viewport)).toEqual({
    height: 34,
    width: 150,
    x: 700,
    y: 120,
  })
})

test('positions a menu to the left and above a target near the bottom right edge', async () => {
  expect(await GetMenuBounds.getMenuBounds(1090, 470, items, false, viewport)).toEqual({
    height: 34,
    width: 150,
    x: 935,
    y: 436,
  })
})

test('clamps to the owning viewport, including when the menu is larger than it', async () => {
  const bounds = await GetMenuBounds.getMenuBounds(610, 90, items, false, { ...viewport, width: 100, height: 20 })
  expect(bounds.x).toBe(600)
  expect(bounds.y).toBe(80)
})

test('positions a dropdown below its target', async () => {
  const bounds = await GetMenuBounds.getMenuBounds(1090, 470, items, true, viewport)
  expect(bounds.x).toBe(935)
  expect(bounds.y).toBe(470)
})

test('uses refreshed viewport dimensions after a divider move', async () => {
  const resized = { x: 900, y: 100, width: 200, height: 300 }
  const bounds = await GetMenuBounds.getMenuBounds(1000, 390, items, false, resized)
  expect(bounds.x).toBe(900)
  expect(bounds.y).toBe(356)
})
