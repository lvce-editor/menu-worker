import { showSubMenu } from '../ShowSubMenu/ShowSubMenu.ts'

export const selectIndexSubMenu = async (menu: any, item: any, index: number): Promise<void> => {
  if (menu.focusedIndex === index) {
    return
  }
  await showSubMenu(menu.level, menu.focusedIndex)
}
