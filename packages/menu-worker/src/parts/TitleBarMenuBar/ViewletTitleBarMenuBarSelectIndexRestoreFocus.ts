import type { MenuState } from '../MenuState/MenuState.ts'
import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexRestoreFocus = async (state: MenuState, item: any): Promise<MenuState> => {
  await ExecuteMenuItemCommand.executeMenuItemCommand(item)
  return {
    ...state,
    menus: [],
    isMenuOpen: false,
  }
}
