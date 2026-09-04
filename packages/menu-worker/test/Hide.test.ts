import { beforeEach, expect, jest, test } from '@jest/globals'

const invoke = jest.fn<(method: string, ...params: readonly any[]) => Promise<void>>(async () => {})

jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.js', () => ({
  invoke,
}))

const { hide } = await import('../src/parts/Hide/Hide.ts')
const InternalMenuState = await import('../src/parts/InternalMenuState/InternalMenuState.ts')

beforeEach(() => {
  jest.clearAllMocks()
  InternalMenuState.set([{}])
})

test('routes hide through the renderer worker compatibility adapter', async () => {
  await hide(false)

  expect(invoke).toHaveBeenCalledWith('Menu.hide', false)
  expect(InternalMenuState.getCount()).toBe(0)
})
