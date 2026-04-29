import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'
import { hide } from '../Hide/Hide.ts'

export const selectIndexNone = async (menu: any, item: any): Promise<void> => {
  await Promise.all([hide(/* restoreFocus */ false), ExecuteMenuItemCommand.executeMenuItemCommand(item)])
}