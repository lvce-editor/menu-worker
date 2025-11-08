import { expect, test } from '@jest/globals'
import * as MenuEntriesGo from '../src/parts/MenuEntriesGo/MenuEntriesGo.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('id is Go', () => {
  expect(MenuEntriesGo.id).toBe(MenuEntryId.Go)
})

test('getMenuEntries returns empty array', () => {
  const entries = MenuEntriesGo.getMenuEntries()
  expect(entries).toEqual([])
  expect(entries.length).toBe(0)
})
