import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as MenuEntriesOpenRecent from '../src/parts/MenuEntriesOpenRecent/MenuEntriesOpenRecent.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('id should be OpenRecent', () => {
  expect(MenuEntriesOpenRecent.id).toBe(MenuEntryId.OpenRecent)
})

test('getMenuEntries should return menu entries with more and clear when no recent items', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'RecentlyOpened.getRecentlyOpened': async () => {
        return []
      },
    },
  })
  RendererWorker.set(mockRpc)

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result).toEqual([
    {
      command: 'QuickPick.showRecent',
      flags: MenuItemFlags.None,
      id: 'more',
      label: '...',
    },
    {
      command: '',
      flags: MenuItemFlags.Separator,
      id: 'separator',
      label: '',
    },
    {
      command: 'RecentlyOpened.clearRecentlyOpened',
      flags: MenuItemFlags.None,
      id: 'clearRecentlyOpened',
      label: 'clear',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getMenuEntries should return menu entries with recent items, separator, more, and clear', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'RecentlyOpened.getRecentlyOpened': async () => {
        return ['file:///home/user/project1', 'file:///home/user/project2']
      },
    },
  })
  RendererWorker.set(mockRpc)

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result).toEqual([
    {
      args: ['file:///home/user/project1'],
      command: 'Workspace.setPath',
      flags: MenuItemFlags.None,
      label: '/home/user/project1',
    },
    {
      args: ['file:///home/user/project2'],
      command: 'Workspace.setPath',
      flags: MenuItemFlags.None,
      label: '/home/user/project2',
    },
    {
      command: '',
      flags: MenuItemFlags.Separator,
      id: 'separator',
      label: '',
    },
    {
      command: 'QuickPick.showRecent',
      flags: MenuItemFlags.None,
      id: 'more',
      label: '...',
    },
    {
      command: '',
      flags: MenuItemFlags.Separator,
      id: 'separator',
      label: '',
    },
    {
      command: 'RecentlyOpened.clearRecentlyOpened',
      flags: MenuItemFlags.None,
      id: 'clearRecentlyOpened',
      label: 'clear',
    },
  ])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getMenuEntries should limit to 10 recent items', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'RecentlyOpened.getRecentlyOpened': async () => {
        return Array.from({ length: 15 }, (_, i) => `file:///home/user/project${i + 1}`)
      },
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
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getMenuEntries should handle paths with file protocol', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'RecentlyOpened.getRecentlyOpened': async () => {
        return ['file:///path/to/project']
      },
    },
  })
  RendererWorker.set(mockRpc)

  const result = await MenuEntriesOpenRecent.getMenuEntries()
  expect(result[0].label).toBe('/path/to/project')
  expect(result[0].args).toEqual(['file:///path/to/project'])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getMenuEntries should handle exactly 10 items', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'RecentlyOpened.getRecentlyOpened': async () => {
        return Array.from({ length: 10 }, (_, i) => `file:///home/user/project${i + 1}`)
      },
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
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})
