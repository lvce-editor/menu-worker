import { MenuEntryId } from '@lvce-editor/constants'
import type { MenuEntry } from '../MenuEntry/MenuEntry.ts'
import { getTitleBarMenuEntries } from '../GetTitleBarMenuEntries/GetTitleBarMenuEntries.ts'
import * as MenuEntriesTitleBar from '../MenuEntriesTitleBar/MenuEntriesTitleBar.ts'
import { menus } from '../Menus/Menus.ts'

export const getMenuIds = (): readonly number[] => {
  return menus.map((menu) => menu.id)
}

export const getMenuEntries = async (id: number, platform: number): Promise<readonly MenuEntry[]> => {
  if (id === MenuEntryId.TitleBar) {
    return MenuEntriesTitleBar.getMenuEntries(platform)
  }
  return getTitleBarMenuEntries(id, platform)
}
