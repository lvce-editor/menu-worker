import { MenuItemFlags } from '@lvce-editor/constants'
import * as ExecuteMenuItemCommand from '../ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts'
import { hide } from '../Hide/Hide.ts'
import { get } from '../InternalMenuState/InternalMenuState.ts'
import { showSubMenu } from '../ShowSubMenu/ShowSubMenu.ts'

const selectIndexNone = async (menu: any, item: any): Promise<void> => {
  await Promise.all([hide(/* restoreFocus */ false), ExecuteMenuItemCommand.executeMenuItemCommand(item)])
}

const selectIndexRestoreFocus = async (menu: any, item: any): Promise<void> => {
  await Promise.all([hide(/* restoreFocus */ true), ExecuteMenuItemCommand.executeMenuItemCommand(item)])
}

const selectIndexSubMenu = async (menu: any, item: any, index: number): Promise<void> => {
  if (menu.focusedIndex === index) {
    return
  }
  await showSubMenu(menu.level, menu.focusedIndex)
}

const selectIndexDefault = async (): Promise<void> => {}

const selectIndexIgnore = async (menu: any, item: any): Promise<void> => {
  await ExecuteMenuItemCommand.executeMenuItemCommand(item)
}

const getSelectIndexFunction = (flags: number): any => {
  switch (flags) {
    case MenuItemFlags.Ignore:
      return selectIndexIgnore
    case MenuItemFlags.None:
      return selectIndexNone
    case MenuItemFlags.RestoreFocus:
      return selectIndexRestoreFocus
    case MenuItemFlags.SubMenu:
      return selectIndexSubMenu
    default:
      return selectIndexDefault
  }
}

export const selectIndex = async (level: number, index: number): Promise<any> => {
  const menu = get(level)
  // TODO avoid assignment
  menu.focusedIndex = index
  const item = menu.items[menu.focusedIndex]
  const fn = getSelectIndexFunction(item.flags)
  await fn(menu, item, index)
}
