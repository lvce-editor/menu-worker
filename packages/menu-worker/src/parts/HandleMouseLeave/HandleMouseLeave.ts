import { get, getAll } from '../InternalMenuState/InternalMenuState.ts'

export const handleMouseLeave = async (): Promise<any> => {
  const menu = get(0)
  if (menu.items.length === 0) {
    return
  }
  const oldFocusedIndex = menu.focusedIndex
  menu.focusedIndex = -1
  return {
    commands: [/* Menu.focusIndex */ 'Menu.focusIndex', /* level */ menu.level, /* oldFocusedIndex */ oldFocusedIndex, /* newFocusedIndex */ -1],
    menus: getAll(),
  }
}
