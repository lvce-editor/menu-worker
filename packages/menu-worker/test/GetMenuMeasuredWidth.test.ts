import { beforeEach, expect, jest, test } from '@jest/globals'

jest.unstable_mockModule('../src/parts/TextMeasurementWorker/TextMeasurementWorker.ts', () => {
  return {
    measureTextWidths: jest.fn((texts: readonly string[]) => texts.map((text) => text.length * 10)),
  }
})

const GetMenuMeasuredWidth = await import('../src/parts/GetMenuMeasuredWidth/GetMenuMeasuredWidth.ts')
const TextMeasurementWorker = await import('../src/parts/TextMeasurementWorker/TextMeasurementWorker.ts')

beforeEach(() => {
  jest.clearAllMocks()
})

test('returns minimum menu width for short labels', async () => {
  const width = await GetMenuMeasuredWidth.getMenuMeasuredWidth([
    {
      label: 'Sign Out',
    },
  ])

  expect(width).toBe(150)
})

test('measures all labels and includes menu item chrome', async () => {
  const width = await GetMenuMeasuredWidth.getMenuMeasuredWidth([
    {
      label: 'Short',
    },
    {
      label: 'A much longer menu item',
    },
  ])

  expect(TextMeasurementWorker.measureTextWidths).toHaveBeenCalledTimes(1)
  expect(TextMeasurementWorker.measureTextWidths).toHaveBeenCalledWith(
    ['Short', 'A much longer menu item'],
    400,
    13,
    'system-ui, Ubuntu, Droid Sans, sans-serif',
    0,
    false,
    8,
  )
  expect(width).toBe(294)
})

test('ignores items without labels', async () => {
  const width = await GetMenuMeasuredWidth.getMenuMeasuredWidth([
    {
      flags: 2,
    },
  ])

  expect(width).toBe(150)
})
