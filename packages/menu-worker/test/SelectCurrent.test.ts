import { beforeEach, expect, jest, test } from '@jest/globals'

const getCount = jest.fn<() => number>()
const getCurrentMenu = jest.fn<() => Readonly<{ focusedIndex: number; level: number }>>()
const selectIndex = jest.fn<(level: number, index: number) => Promise<void>>()

jest.unstable_mockModule('../src/parts/InternalMenuState/InternalMenuState.ts', () => ({
  getCount,
}))

jest.unstable_mockModule('../src/parts/FocusFirst/FocusFirst.ts', () => ({
  getCurrentMenu,
}))

jest.unstable_mockModule('../src/parts/SelectIndex/SelectIndex.ts', () => ({
  selectIndex,
}))

const { selectCurrent } = await import('../src/parts/SelectCurrent/SelectCurrent.ts')

beforeEach(() => {
  jest.clearAllMocks()
})

test('selectCurrent selects the focused item from the current menu', async () => {
  getCount.mockReturnValue(2)
  getCurrentMenu.mockReturnValue({ focusedIndex: 4, level: 1 })

  await selectCurrent()

  expect(selectIndex).toHaveBeenCalledWith(1, 4)
})

test('selectCurrent does nothing when no menu is open', async () => {
  getCount.mockReturnValue(0)

  await selectCurrent()

  expect(getCurrentMenu).not.toHaveBeenCalled()
  expect(selectIndex).not.toHaveBeenCalled()
})

test('selectCurrent does nothing when no item is focused', async () => {
  getCount.mockReturnValue(1)
  getCurrentMenu.mockReturnValue({ focusedIndex: -1, level: 0 })

  await selectCurrent()

  expect(selectIndex).not.toHaveBeenCalled()
})
