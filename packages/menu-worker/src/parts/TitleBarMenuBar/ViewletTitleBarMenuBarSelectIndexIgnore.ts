import type { MenuState } from '../MenuState/MenuState.ts'
import * as ExecuteMenuItemcommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexIgnore = async (state: MenuState, item: any): Promise<MenuState> => {
  await ExecuteMenuItemcommand.executeMenuItemCommand(item)
  return state
}
