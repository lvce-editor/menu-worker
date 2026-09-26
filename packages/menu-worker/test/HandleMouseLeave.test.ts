import { beforeEach, expect, jest, test } from '@jest/globals'
import * as InternalMenuState from '../src/parts/InternalMenuState/InternalMenuState.ts'

beforeEach(() => {
  jest.resetAllMocks()
  InternalMenuState.reset()
})

jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.ts', () => {
  return {
    invoke: jest.fn(),
  }
})

const RendererProcess = await import('../src/parts/RendererProcess/RendererProcess.ts')
const { handleMouseLeave } = await import('../src/parts/HandleMouseLeave/HandleMouseLeave.ts')

test('clears the focused item in the menu that the pointer left', async () => {
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [{}, {}, {}],
      level: 0,
    },
    {
      focusedIndex: 1,
      items: [{}, {}],
      level: 1,
    },
  ])

  await handleMouseLeave(1)

  expect(InternalMenuState.get(0).focusedIndex).toBe(2)
  expect(InternalMenuState.get(1).focusedIndex).toBe(-1)
  expect(RendererProcess.invoke).toHaveBeenCalledWith('Menu.focusIndex', 1, 1, -1)
})

test('does nothing when the menu has no focused item', async () => {
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [{}],
      level: 0,
    },
  ])

  await handleMouseLeave(0)

  expect(RendererProcess.invoke).not.toHaveBeenCalled()
})
