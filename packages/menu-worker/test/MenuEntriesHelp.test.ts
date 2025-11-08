import { expect, test } from '@jest/globals'
import * as HelpStrings from '../src/parts/HelpStrings/HelpStrings.ts'
import * as MenuEntriesHelp from '../src/parts/MenuEntriesHelp/MenuEntriesHelp.ts'
import * as MenuEntryId from '../src/parts/MenuEntryId/MenuEntryId.ts'
import * as MenuEntrySeparator from '../src/parts/MenuEntrySeparator/MenuEntrySeparator.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'
import * as PlatformType from '../src/parts/PlatformType/PlatformType.ts'

test('id is MenuEntryId.Help', () => {
  expect(MenuEntriesHelp.id).toBe(MenuEntryId.Help)
})

test('getMenuEntries returns array of menu entries for Web platform', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Web)
  expect(Array.isArray(entries)).toBe(true)
  expect(entries.length).toBe(1)
})

test('getMenuEntries returns only about entry for Web platform', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Web)
  const aboutEntry = entries[0]
  expect(aboutEntry.id).toBe('about')
  expect(aboutEntry.label).toBe(HelpStrings.about())
  expect(aboutEntry.flags).toBe(MenuItemFlags.None)
  expect(aboutEntry.command).toBe('About.showAbout')
})

test('getMenuEntries returns correct entries for Electron platform', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  expect(entries.length).toBe(4)
  expect(entries[0].id).toBe('toggleDeveloperTools')
  expect(entries[1].id).toBe('openProcessExplorer')
  expect(entries[2]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(entries[3].id).toBe('about')
})

test('getMenuEntries returns correct entries for Remote platform', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Remote)
  expect(entries.length).toBe(4)
  expect(entries[0].id).toBe('toggleDeveloperTools')
  expect(entries[1].id).toBe('openProcessExplorer')
  expect(entries[2]).toBe(MenuEntrySeparator.menuEntrySeparator)
  expect(entries[3].id).toBe('about')
})

test('getMenuEntries returns toggleDeveloperTools entry with correct properties', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  const toggleDeveloperToolsEntry = entries[0]
  expect(toggleDeveloperToolsEntry.id).toBe('toggleDeveloperTools')
  expect(toggleDeveloperToolsEntry.label).toBe(HelpStrings.toggleDeveloperTools())
  expect(toggleDeveloperToolsEntry.flags).toBe(MenuItemFlags.None)
  expect(toggleDeveloperToolsEntry.command).toBe('Developer.toggleDeveloperTools')
})

test('getMenuEntries returns openProcessExplorer entry with correct properties', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  const openProcessExplorerEntry = entries[1]
  expect(openProcessExplorerEntry.id).toBe('openProcessExplorer')
  expect(openProcessExplorerEntry.label).toBe(HelpStrings.openProcessExplorer())
  expect(openProcessExplorerEntry.flags).toBe(MenuItemFlags.RestoreFocus)
  expect(openProcessExplorerEntry.command).toBe('Developer.openProcessExplorer')
})

test('getMenuEntries returns separator before about entry for non-Web platforms', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  expect(entries[2]).toBe(MenuEntrySeparator.menuEntrySeparator)
})

test('getMenuEntries returns about entry with correct properties', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  const aboutEntry = entries[3]
  expect(aboutEntry.id).toBe('about')
  expect(aboutEntry.label).toBe(HelpStrings.about())
  expect(aboutEntry.flags).toBe(MenuItemFlags.None)
  expect(aboutEntry.command).toBe('About.showAbout')
})

test('getMenuEntries returns entries in correct order for non-Web platforms', async () => {
  const entries = await MenuEntriesHelp.getMenuEntries(PlatformType.Electron)
  expect(entries[0].id).toBe('toggleDeveloperTools')
  expect(entries[1].id).toBe('openProcessExplorer')
  expect(entries[2].id).toBe('separator')
  expect(entries[3].id).toBe('about')
})
