import { MenuEntryId } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import * as MenuEntriesEdit from '../MenuEntriesEdit/MenuEntriesEdit.ts'
import * as MenuEntriesFile from '../MenuEntriesFile/MenuEntriesFile.ts'
import * as MenuEntriesGo from '../MenuEntriesGo/MenuEntriesGo.ts'
import * as MenuEntriesHelp from '../MenuEntriesHelp/MenuEntriesHelp.ts'
import * as MenuEntriesOpenRecent from '../MenuEntriesOpenRecent/MenuEntriesOpenRecent.ts'
import * as MenuEntriesRun from '../MenuEntriesRun/MenuEntriesRun.ts'
import * as MenuEntriesSelection from '../MenuEntriesSelection/MenuEntriesSelection.ts'
import * as MenuEntriesTerminal from '../MenuEntriesTerminal/MenuEntriesTerminal.ts'
import * as MenuEntriesView from '../MenuEntriesView/MenuEntriesView.ts'
import { MenuIdAppearance, MenuIdEditorLayout, MenuIdSwitchEditor, MenuIdSwitchGroup } from '../TitleBarMenuIds/TitleBarMenuIds.ts'

export const getTitleBarMenuEntries = async (menuId: string | number, platform: number): Promise<readonly MenuEntry[]> => {
  switch (menuId) {
    case MenuEntryId.Edit:
      return MenuEntriesEdit.getMenuEntries()
    case MenuEntryId.File: {
      const { hasOpenTextEditor } = await import('../HasOpenTextEditor/HasOpenTextEditor.ts')
      return MenuEntriesFile.getMenuEntries(platform, undefined, await hasOpenTextEditor())
    }
    case MenuEntryId.Go:
      return MenuEntriesGo.getMenuEntries()
    case MenuEntryId.Help:
      return MenuEntriesHelp.getMenuEntries(platform)
    case MenuEntryId.OpenRecent:
      return MenuEntriesOpenRecent.getMenuEntries()
    case MenuEntryId.Run:
      return MenuEntriesRun.getMenuEntries()
    case MenuEntryId.Selection: {
      const { hasOpenTextEditor } = await import('../HasOpenTextEditor/HasOpenTextEditor.ts')
      return MenuEntriesSelection.getMenuEntries(await hasOpenTextEditor())
    }
    case MenuEntryId.Terminal:
      return MenuEntriesTerminal.getMenuEntries()
    case MenuEntryId.View:
      return MenuEntriesView.getMenuEntries()
    case MenuIdAppearance: {
      const { getMenuEntries } = await import('../MenuEntriesAppearance/MenuEntriesAppearance.ts')
      return getMenuEntries()
    }
    case MenuIdEditorLayout: {
      const { getMenuEntries } = await import('../MenuEntriesEditorLayout/MenuEntriesEditorLayout.ts')
      return getMenuEntries()
    }
    case MenuIdSwitchEditor:
      return MenuEntriesGo.getMenuEntriesSwitchEditor()
    case MenuIdSwitchGroup:
      return MenuEntriesGo.getMenuEntriesSwitchGroup()
    default:
      return []
  }
}
