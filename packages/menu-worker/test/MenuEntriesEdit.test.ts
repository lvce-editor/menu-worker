import { expect, test } from '@jest/globals'
import * as EditorStrings from '../src/parts/EditorStrings/EditorStrings.ts'
import * as MenuEntriesEdit from '../src/parts/MenuEntriesEdit/MenuEntriesEdit.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

test('id is MenuEntryId.Edit', () => {
  expect(MenuEntriesEdit.id).toBe(MenuEntryId.Edit)
})

test('getMenuEntries returns array of menu entries', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  expect(Array.isArray(entries)).toBe(true)
  expect(entries.length).toBeGreaterThan(0)
})

test('getMenuEntries returns correct number of entries', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  expect(entries.length).toBe(9)
})

test('getMenuEntries returns undo entry with correct properties', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  const undoEntry = entries[0]
  expect(undoEntry.id).toBe('undo')
  expect(undoEntry.label).toBe(EditorStrings.undo())
  expect(undoEntry.flags).toBe(MenuItemFlags.Disabled)
  expect(undoEntry.command).toBe('-1')
})

test('getMenuEntries returns redo entry with correct properties', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  const redoEntry = entries[1]
  expect(redoEntry.id).toBe('redo')
  expect(redoEntry.label).toBe(EditorStrings.redo())
  expect(redoEntry.flags).toBe(MenuItemFlags.Disabled)
  expect(redoEntry.command).toBe('-1')
})

test('getMenuEntries returns separator after undo/redo', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  expect(entries[2]).toBe(MenuEntrySeparator.menuEntrySeparator)
})

test('getMenuEntries returns cut entry with correct properties', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  const cutEntry = entries[3]
  expect(cutEntry.id).toBe('cut')
  expect(cutEntry.label).toBe(EditorStrings.cut())
  expect(cutEntry.flags).toBe(MenuItemFlags.None)
  expect(cutEntry.command).toBe('Editor.cut')
})

test('getMenuEntries returns copy entry with correct properties', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  const copyEntry = entries[4]
  expect(copyEntry.id).toBe('copy')
  expect(copyEntry.label).toBe(EditorStrings.copy())
  expect(copyEntry.flags).toBe(MenuItemFlags.None)
  expect(copyEntry.command).toBe('Editor.copy')
})

test('getMenuEntries returns paste entry with correct properties', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  const pasteEntry = entries[5]
  expect(pasteEntry.id).toBe('paste')
  expect(pasteEntry.label).toBe(EditorStrings.paste())
  expect(pasteEntry.flags).toBe(MenuItemFlags.None)
  expect(pasteEntry.command).toBe('Editor.paste')
})

test('getMenuEntries returns separator after cut/copy/paste', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  expect(entries[6]).toBe(MenuEntrySeparator.menuEntrySeparator)
})

test('getMenuEntries returns toggle-line-comment entry with correct properties', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  const toggleLineCommentEntry = entries[7]
  expect(toggleLineCommentEntry.id).toBe('toggle-line-comment')
  expect(toggleLineCommentEntry.label).toBe(EditorStrings.toggleLineComment())
  expect(toggleLineCommentEntry.flags).toBe(MenuItemFlags.None)
  expect(toggleLineCommentEntry.command).toBe('Editor.toggleLineComment')
})

test('getMenuEntries returns toggle-block-comment entry with correct properties', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  const toggleBlockCommentEntry = entries[8]
  expect(toggleBlockCommentEntry.id).toBe('toggle-block-comment')
  expect(toggleBlockCommentEntry.label).toBe(EditorStrings.toggleBlockComment())
  expect(toggleBlockCommentEntry.flags).toBe(MenuItemFlags.None)
  expect(toggleBlockCommentEntry.command).toBe('Editor.toggleBlockComment')
})

test('getMenuEntries returns entries in correct order', () => {
  const entries = MenuEntriesEdit.getMenuEntries()
  expect(entries[0].id).toBe('undo')
  expect(entries[1].id).toBe('redo')
  expect(entries[2].id).toBe('separator')
  expect(entries[3].id).toBe('cut')
  expect(entries[4].id).toBe('copy')
  expect(entries[5].id).toBe('paste')
  expect(entries[6].id).toBe('separator')
  expect(entries[7].id).toBe('toggle-line-comment')
  expect(entries[8].id).toBe('toggle-block-comment')
})
