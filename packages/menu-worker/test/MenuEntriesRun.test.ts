import { expect, test } from '@jest/globals'
import * as MenuEntriesRun from '../src/parts/MenuEntriesRun/MenuEntriesRun.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'

test('id is MenuEntryId.Run', () => {
  expect(MenuEntriesRun.id).toBe(MenuEntryId.Run)
})

test('getMenuEntries returns array of menu entries', () => {
  const entries = MenuEntriesRun.getMenuEntries()
  expect(Array.isArray(entries)).toBe(true)
})

test('getMenuEntries returns empty array', () => {
  const entries = MenuEntriesRun.getMenuEntries()
  expect(entries.length).toBe(0)
})
