import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'

export const selectIndexIgnore = async (menu: any, item: any): Promise<void> => {
  await ExecuteMenuItemCommand.executeMenuItemCommand(item)
}