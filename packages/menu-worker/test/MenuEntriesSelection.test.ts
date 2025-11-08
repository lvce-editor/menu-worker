import { expect, test } from '@jest/globals'
import * as EditorStrings from '../src/parts/EditorStrings/EditorStrings.ts'
import * as MenuEntriesSelection from '../src/parts/MenuEntriesSelection/MenuEntriesSelection.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('id is Selection', () => {
  expect(MenuEntriesSelection.id).toBe(MenuEntryId.Selection)
})

test('getMenuEntries returns array of menu entries', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  expect(Array.isArray(entries)).toBe(true)
  expect(entries.length).toBeGreaterThan(0)
})

test('getMenuEntries returns correct number of entries', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  expect(entries.length).toBe(5)
})

test('getMenuEntries returns selectAll entry with correct properties', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  const selectAllEntry = entries[0]
  expect(selectAllEntry.id).toBe('selectAll')
  expect(selectAllEntry.label).toBe(EditorStrings.selectAll())
  expect(selectAllEntry.flags).toBe(MenuItemFlags.None)
  expect(selectAllEntry.command).toBe('Editor.selectAll')
})

test('getMenuEntries returns copyLineUp entry with correct properties', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  const copyLineUpEntry = entries[1]
  expect(copyLineUpEntry.id).toBe('copyLineUp')
  expect(copyLineUpEntry.label).toBe(EditorStrings.copyLineUp())
  expect(copyLineUpEntry.flags).toBe(MenuItemFlags.None)
  expect(copyLineUpEntry.command).toBe('Editor.copyLineUp')
})

test('getMenuEntries returns copyLineDown entry with correct properties', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  const copyLineDownEntry = entries[2]
  expect(copyLineDownEntry.id).toBe('copyLineDown')
  expect(copyLineDownEntry.label).toBe(EditorStrings.copyLineDown())
  expect(copyLineDownEntry.flags).toBe(MenuItemFlags.None)
  expect(copyLineDownEntry.command).toBe('Editor.copyLineDown')
})

test('getMenuEntries returns moveLineUp entry with correct properties', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  const moveLineUpEntry = entries[3]
  expect(moveLineUpEntry.id).toBe('moveLineUp')
  expect(moveLineUpEntry.label).toBe(EditorStrings.moveLineUp())
  expect(moveLineUpEntry.flags).toBe(MenuItemFlags.Disabled)
  expect(moveLineUpEntry.command).toBe('Editor.moveLineUp')
})

test('getMenuEntries returns moveLineDown entry with correct properties', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  const moveLineDownEntry = entries[4]
  expect(moveLineDownEntry.id).toBe('moveLineDown')
  expect(moveLineDownEntry.label).toBe(EditorStrings.moveLineDown())
  expect(moveLineDownEntry.flags).toBe(MenuItemFlags.Disabled)
  expect(moveLineDownEntry.command).toBe('Editor.moveLineDown')
})

test('getMenuEntries returns entries in correct order', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  expect(entries[0].id).toBe('selectAll')
  expect(entries[1].id).toBe('copyLineUp')
  expect(entries[2].id).toBe('copyLineDown')
  expect(entries[3].id).toBe('moveLineUp')
  expect(entries[4].id).toBe('moveLineDown')
})

test('getMenuEntries has correct structure for all entries', () => {
  const entries = MenuEntriesSelection.getMenuEntries()
  for (const entry of entries) {
    expect(entry).toHaveProperty('id')
    expect(entry).toHaveProperty('label')
    expect(entry).toHaveProperty('flags')
    expect(entry).toHaveProperty('command')
    expect(typeof entry.id).toBe('string')
    expect(typeof entry.label).toBe('string')
    expect(typeof entry.flags).toBe('number')
    expect(typeof entry.command).toBe('string')
  }
})
