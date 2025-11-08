import { expect, test } from '@jest/globals'
import * as MenuEntriesTerminal from '../src/parts/MenuEntriesTerminal/MenuEntriesTerminal.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as TerminalStrings from '../src/parts/TerminalStrings/TerminalStrings.ts'

test('id is MenuEntryId.Terminal', () => {
  expect(MenuEntriesTerminal.id).toBe(MenuEntryId.Terminal)
})

test('getMenuEntries returns array of menu entries', () => {
  const entries = MenuEntriesTerminal.getMenuEntries()
  expect(Array.isArray(entries)).toBe(true)
  expect(entries.length).toBeGreaterThan(0)
})

test('getMenuEntries returns correct number of entries', () => {
  const entries = MenuEntriesTerminal.getMenuEntries()
  expect(entries.length).toBe(1)
})

test('getMenuEntries returns newTerminal entry with correct properties', () => {
  const entries = MenuEntriesTerminal.getMenuEntries()
  const newTerminalEntry = entries[0]
  expect(newTerminalEntry.id).toBe('newTerminal')
  expect(newTerminalEntry.label).toBe(TerminalStrings.newTerminal())
  expect(newTerminalEntry.flags).toBe(MenuItemFlags.None)
  expect(newTerminalEntry.command).toBe('Layout.togglePanel')
  expect(newTerminalEntry.args).toEqual(['Terminal'])
})

test('getMenuEntries has correct structure for all entries', () => {
  const entries = MenuEntriesTerminal.getMenuEntries()
  for (const entry of entries) {
    expect(entry).toHaveProperty('label')
    expect(entry).toHaveProperty('flags')
    expect(entry).toHaveProperty('command')
    expect(typeof entry.label).toBe('string')
    expect(typeof entry.flags).toBe('number')
    expect(typeof entry.command).toBe('string')
  }
})
