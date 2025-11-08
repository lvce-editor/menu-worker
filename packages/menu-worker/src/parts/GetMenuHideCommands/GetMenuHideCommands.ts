import { state } from '../GetMenuShowCommands/GetMenuShowCommands.ts'

export const getMenuHideCommands = async (restoreFocus = true): Promise<any> => {
  if (state.menus.length === 0) {
    return {
      newMenus: [],
      commands: [],
    }
  }
  state.menus = []
  return {
    commands: [/* Menu.hide */ 'Menu.hide', /* restoreFocus */ restoreFocus],
    newMenus: [],
  }
}
