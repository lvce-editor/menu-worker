import { expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/GetMenuMeasuredWidth/GetMenuMeasuredWidth.ts', () => {
  return {
    getMenuMeasuredWidth: jest.fn(() => 150),
  }
})

const GetMenuBounds = await import('../src/parts/GetMenuBounds/GetMenuBounds.ts')

test('positions menu with a five pixel gap when it opens to the left of target', async () => {
  const bounds = await GetMenuBounds.getMenuBounds(200, 100, [
    {
      label: 'Sign Out',
    },
  ])

  expect(bounds).toEqual({
    height: 34,
    width: 150,
    x: 45,
    y: 66,
  })
})

test('keeps menu inside left edge', async () => {
  const bounds = await GetMenuBounds.getMenuBounds(100, 100, [
    {
      label: 'Sign Out',
    },
  ])

  expect(bounds.x).toBe(0)
})
