import { expect, test } from '@jest/globals'
import * as MenuEntriesFile from '../src/parts/MenuEntriesFile/MenuEntriesFile.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('id is File', () => {
  expect(MenuEntriesFile.id).toBe(MenuEntryId.File)
})

test('getMenuEntries returns correct entries for Web platform', () => {
  const entries = MenuEntriesFile.getMenuEntries(PlatformType.Web)
  expect(entries.length).toBe(9)
  expect(entries[0].id).toBe('newFile')
  expect(entries[1].id).toBe('newWindow')
  expect(entries[2].flags).toBe(MenuItemFlags.Separator)
  expect(entries[3].id).toBe('openFile')
  expect(entries[4].id).toBe('openFolder')
  expect(entries[5].id).toBe(MenuEntryId.OpenRecent)
  expect(entries[6].flags).toBe(MenuItemFlags.Separator)
  expect(entries[7].id).toBe('save')
  expect(entries[8].id).toBe('saveAll')
})

test('getMenuEntries returns correct entries for Remote platform', () => {
  const entries = MenuEntriesFile.getMenuEntries(PlatformType.Remote)
  expect(entries.length).toBe(9)
  expect(entries[entries.length - 1].id).toBe('saveAll')
})

test('getMenuEntries returns correct entries for Electron platform', () => {
  const entries = MenuEntriesFile.getMenuEntries(PlatformType.Electron)
  expect(entries.length).toBe(11)
  expect(entries[entries.length - 2].flags).toBe(MenuItemFlags.Separator)
  expect(entries[entries.length - 1].id).toBe('exit')
  expect(entries[entries.length - 1].flags).toBe(MenuItemFlags.Ignore)
  expect(entries[entries.length - 1].command).toBe('Chrome.exit')
})

test('getMenuEntries has correct structure for all entries', () => {
  const entries = MenuEntriesFile.getMenuEntries(PlatformType.Web)
  for (const entry of entries) {
    expect(entry).toHaveProperty('label')
    expect(entry).toHaveProperty('flags')
    expect(entry).toHaveProperty('command')
    expect(typeof entry.label).toBe('string')
    expect(typeof entry.flags).toBe('number')
    expect(typeof entry.command).toBe('string')
  }
})

test('getMenuEntries has correct commands', () => {
  const entries = MenuEntriesFile.getMenuEntries(PlatformType.Web)
  const entryMap = new Map(entries.map((entry) => [entry.id, entry]))
  expect(entryMap.get('newFile')?.command).toBe('-1')
  expect(entryMap.get('newWindow')?.command).toBe('Window.openNew')
  expect(entryMap.get('openFile')?.command).toBe('Dialog.openFile')
  expect(entryMap.get('openFolder')?.command).toBe('Dialog.openFolder')
  expect(entryMap.get('save')?.command).toBe('Main.save')
  expect(entryMap.get('saveAll')?.command).toBe('Main.saveAll')
})

test('getMenuEntries has correct flags', () => {
  const entries = MenuEntriesFile.getMenuEntries(PlatformType.Web)
  const entryMap = new Map(entries.map((entry) => [entry.id, entry]))
  expect(entryMap.get('openFolder')?.flags).toBe(MenuItemFlags.RestoreFocus)
  expect(entryMap.get(MenuEntryId.OpenRecent)?.flags).toBe(MenuItemFlags.SubMenu)
})
