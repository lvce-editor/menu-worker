import { getAll } from '../InternalMenuState/InternalMenuState.ts'

export const focusIndex = async (menu: any, index: number): Promise<any> => {
  if (menu.items.length === 0) {
    return
  }
  const oldFocusedIndex = menu.focusedIndex
  menu.focusedIndex = index
  return {
    commands: [/* Menu.focusIndex */ 'Menu.focusIndex', /* level */ menu.level, /* oldFocusedIndex */ oldFocusedIndex, /* newFocusedIndex */ index],
    menus: getAll(),
  }
}
