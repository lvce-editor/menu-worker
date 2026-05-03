import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'
import { hide } from '../Hide/Hide.ts'

export const selectIndexNone = async (menu: any, item: any): Promise<void> => {
  await hide(/* restoreFocus */ false)
  await ExecuteMenuItemCommand.executeMenuItemCommand(item)
}
