import type { MenuState } from '../MenuState/MenuState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import { selectIndexIgnore } from './ViewletTitleBarMenuBarSelectIndexIgnore.ts'
import { selectIndexNone } from './ViewletTitleBarMenuBarSelectIndexNone.ts'
import { selectIndexRestoreFocus } from './ViewletTitleBarMenuBarSelectIndexRestoreFocus.ts'
import { selectIndexSubMenu } from './ViewletTitleBarMenuBarSelectIndexSubMenu.ts'

export const handleMenuClick = async (state: MenuState, level: number, index: number): Promise<MenuState> => {
  const { menus } = state
  const menu = menus[level]
  const item = menu.items[index]
  if (!item) {
    return state
  }
  switch (item.flags) {
    case MenuItemFlags.None:
      return selectIndexNone(state, item)
    case MenuItemFlags.SubMenu:
      return selectIndexSubMenu(state, menu, index)
    case MenuItemFlags.RestoreFocus:
      return selectIndexRestoreFocus(state, item)
    case MenuItemFlags.Ignore:
      return selectIndexIgnore(state, item)
    default:
      return state
  }
}
