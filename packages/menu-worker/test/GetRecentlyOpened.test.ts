import { expect, test } from '@jest/globals'
import { createMockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetRecentlyOpened from '../src/parts/GetRecentlyOpened/GetRecentlyOpened.ts'

test('getRecentlyOpened calls correct RPC method and returns result', async () => {
  const mockData = [{ path: '/path/to/file1.ts' }, { path: '/path/to/file2.ts' }]
  const mockRpc = createMockRpc({
    commandMap: {
      'RecentlyOpened.getRecentlyOpened': async () => {
        return mockData
      },
    },
  })
  RendererWorker.set(mockRpc)

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual(mockData)
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})

test('getRecentlyOpened handles empty result', async () => {
  const mockRpc = createMockRpc({
    commandMap: {
      'RecentlyOpened.getRecentlyOpened': async () => {
        return []
      },
    },
  })
  RendererWorker.set(mockRpc)

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual([])
  expect(mockRpc.invocations).toEqual([['RecentlyOpened.getRecentlyOpened']])
})
