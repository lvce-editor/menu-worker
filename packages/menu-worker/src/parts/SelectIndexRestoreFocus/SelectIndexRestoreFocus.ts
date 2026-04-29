import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'
import { hide } from '../Hide/Hide.ts'

export const selectIndexRestoreFocus = async (menu: any, item: any): Promise<void> => {
  await Promise.all([hide(/* restoreFocus */ true), ExecuteMenuItemCommand.executeMenuItemCommand(item)])
}
