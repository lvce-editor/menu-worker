import { beforeEach, expect, jest, test } from '@jest/globals'
import * as InternalMenuState from '../src/parts/InternalMenuState/InternalMenuState.ts'

const invoke = jest.fn(async (..._args: readonly any[]): Promise<any> => undefined)
const getMenuEntriesWithKeyBindings2 = jest.fn(async (..._args: readonly any[]) => [{ label: 'Rename' }])
jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.ts', () => ({ invoke }))
jest.unstable_mockModule('../src/parts/GetMenuEntriesWithKeyBindings/GetMenuEntriesWithKeyBindings.ts', () => ({ getMenuEntriesWithKeyBindings2 }))
jest.unstable_mockModule('../src/parts/GetMenuMeasuredWidth/GetMenuMeasuredWidth.ts', () => ({ getMenuMeasuredWidth: async () => 150 }))
const { show2 } = await import('../src/parts/Menu/Menu.ts')

beforeEach(() => InternalMenuState.reset())

test('translates application-local pointer and keyboard anchors to the owning page viewport', async () => {
  invoke.mockImplementation(async (method) => (method === 'Menu.getViewport' ? { x: 700, y: 80, width: 500, height: 400 } : undefined))
  await show2(42, 1, 60, 40, true, { menuId: 1 })
  expect(invoke).toHaveBeenCalledWith('Menu.getViewport', 42)
  expect(getMenuEntriesWithKeyBindings2).toHaveBeenCalledWith(42, 1, { menuId: 1 })
  expect(InternalMenuState.getAll()[0]).toMatchObject({ uid: 42, x: 760, y: 120, width: 150 })
  expect(invoke).toHaveBeenCalledWith('Menu.showMenu', 760, 120, 150, 34, expect.any(Array), 0, -1, expect.any(Array), true)
})
