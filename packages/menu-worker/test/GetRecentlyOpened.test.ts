import { expect, test } from '@jest/globals'
import { MockRpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as GetRecentlyOpened from '../src/parts/GetRecentlyOpened/GetRecentlyOpened.ts'

test('getRecentlyOpened calls correct RPC method and returns result', async () => {
  const mockData = [{ path: '/path/to/file1.ts' }, { path: '/path/to/file2.ts' }]
  const mockRpc = MockRpc.create({
    commandMap: {},
    invoke: async (method: string) => {
      if (method === 'RecentlyOpened.getRecentlyOpened') {
        return mockData
      }
      throw new Error(`unexpected method ${method}`)
    },
  })
  RendererWorker.set(mockRpc)

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual(mockData)
})

test('getRecentlyOpened handles empty result', async () => {
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

  const result = await GetRecentlyOpened.getRecentlyOpened()
  expect(result).toEqual([])
})
