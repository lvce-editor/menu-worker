import { getAll, getCount, set } from '../InternalMenuState/InternalMenuState.ts'

export const hideSubMenus = async (level: number): Promise<any> => {
  if (level < getCount()) {
    set(getAll().slice(0, level + 1))
    return {
      commands: [/* Menu.hideSubMenu */ 'Menu.hideSubMenu', /* level */ level + 1],
      menus: getAll(),
    }
  }
}
