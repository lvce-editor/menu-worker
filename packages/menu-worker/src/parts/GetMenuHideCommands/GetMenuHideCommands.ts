import { getCount, reset } from '../InternalMenuState/InternalMenuState.ts'

export const getMenuHideCommands = async (restoreFocus = true): Promise<any> => {
  if (getCount() === 0) {
    return {
      newMenus: [],
      commands: [],
    }
  }
  reset()
  return {
    commands: [/* Menu.hide */ 'Menu.hide', /* restoreFocus */ restoreFocus],
    newMenus: [],
  }
}
