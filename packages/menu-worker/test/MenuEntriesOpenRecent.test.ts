import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as MenuEntriesOpenRecent from '../src/parts/MenuEntriesOpenRecent/MenuEntriesOpenRecent.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('id should be OpenRecent', () => {
  expect(MenuEntriesOpenRecent.id).toBe(MenuEntryId.OpenRecent)
})

test('getMenuEntries should return menu entries with more and clear when no recent items', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'RecentlyOpened.getRecentlyOpened') {
        return []
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result.length).toBe(3)
  expect(result[0]).toEqual({
    id: 'more',
    label: '...',
    flags: 0,
    command: 'QuickPick.showRecent',
  })
  expect(result[1].id).toBe('separator')
  expect(result[2]).toEqual({
    id: 'clearRecentlyOpened',
    label: 'clear',
    flags: 0,
    command: 'RecentlyOpened.clearRecentlyOpened',
  })
})

test('getMenuEntries should return menu entries with recent items, separator, more, and clear', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'RecentlyOpened.getRecentlyOpened') {
        return ['file:///home/user/project1', 'file:///home/user/project2']
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result.length).toBe(6)
  expect(result[0]).toEqual({
    label: '/home/user/project1',
    flags: 0,
    command: 'Workspace.setPath',
    args: ['file:///home/user/project1'],
  })
  expect(result[1]).toEqual({
    label: '/home/user/project2',
    flags: 0,
    command: 'Workspace.setPath',
    args: ['file:///home/user/project2'],
  })
  expect(result[2].id).toBe('separator')
  expect(result[3].id).toBe('more')
  expect(result[4].id).toBe('separator')
  expect(result[5].id).toBe('clearRecentlyOpened')
})

test('getMenuEntries should limit to 10 recent items', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'RecentlyOpened.getRecentlyOpened') {
        return Array.from({ length: 15 }, (_, i) => `file:///home/user/project${i + 1}`)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result.length).toBe(14)
  expect(result[0].label).toBe('/home/user/project1')
  expect(result[9].label).toBe('/home/user/project10')
  expect(result[10].id).toBe('separator')
  expect(result[11].id).toBe('more')
  expect(result[12].id).toBe('separator')
  expect(result[13].id).toBe('clearRecentlyOpened')
})

test('getMenuEntries should handle paths with file protocol', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'RecentlyOpened.getRecentlyOpened') {
        return ['file:///path/to/project']
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result[0].label).toBe('/path/to/project')
  expect(result[0].args).toEqual(['file:///path/to/project'])
})

test('getMenuEntries should handle exactly 10 items', async () => {
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'RecentlyOpened.getRecentlyOpened') {
        return Array.from({ length: 10 }, (_, i) => `file:///home/user/project${i + 1}`)
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result.length).toBe(14)
  expect(result[9].label).toBe('/home/user/project10')
  expect(result[10].id).toBe('separator')
  expect(result[11].id).toBe('more')
  expect(result[12].id).toBe('separator')
  expect(result[13].id).toBe('clearRecentlyOpened')
})
