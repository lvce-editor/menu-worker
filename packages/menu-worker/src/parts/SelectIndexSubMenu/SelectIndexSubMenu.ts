import { showSubMenu } from '../ShowSubMenu/ShowSubMenu.ts'

export const selectIndexSubMenu = async (menu: any, item: any, index: number): Promise<void> => {
  await showSubMenu(menu.level, index)
}
