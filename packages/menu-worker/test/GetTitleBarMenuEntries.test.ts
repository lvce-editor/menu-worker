import { expect, test } from '@jest/globals'
import { MenuEntryId } from '@lvce-editor/constants'
import { getTitleBarMenuEntries } from '../src/parts/GetTitleBarMenuEntries/GetTitleBarMenuEntries.ts'
import { MenuIdEditorLayout, MenuIdSwitchEditor, MenuIdSwitchGroup } from '../src/parts/TitleBarMenuIds/TitleBarMenuIds.ts'

test.each([
  MenuEntryId.Edit,
  MenuEntryId.Go,
  MenuEntryId.Help,
  MenuEntryId.Selection,
  MenuEntryId.Terminal,
  MenuEntryId.View,
  MenuIdEditorLayout,
  MenuIdSwitchEditor,
  MenuIdSwitchGroup,
])('resolves title bar submenu %s without routing back to title bar', async (id) => {
  const entries = await getTitleBarMenuEntries(id, 1)
  expect(entries.length).toBeGreaterThan(0)
  expect(entries.every((entry) => typeof entry.label === 'string')).toBe(true)
})

test('unknown menu is empty', async () => {
  expect(await getTitleBarMenuEntries('unknown', 1)).toEqual([])
})
