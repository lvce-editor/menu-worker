import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import { hideSubMenus } from '../HideSubMenus/HideSubMenus.ts'
import { get, getCount, getLatestTimestamp, setTimestamp } from '../InternalMenuState/InternalMenuState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import { resolveAfterTimeout } from '../ResolveAfterTimeout/ResolveAfterTimeout.ts'
import { showSubMenuAtEnter } from '../ShowSubMenu/ShowSubMenu.ts'

export const handleMouseEnter = async (level: number, index: number, enterX: number, enterY: number, enterTimeStamp: number): Promise<any> => {
  setTimestamp(enterTimeStamp)
  if (level >= getCount()) {
    return
  }
  const menu = get(level)
  if (menu.focusedIndex === index) {
    return
  }
  if (level < getCount() - 1) {
    const subMenu = get(level + 1)
    const subMenuEnterX = subMenu.enterX
    // TODO should check for triangle position here
    if (enterX >= subMenuEnterX) {
      await new Promise(resolveAfterTimeout)
      if (getLatestTimestamp() !== enterTimeStamp) {
        return
      }
    }
  }
  const item = menu.items[index]
  await focusIndex(menu, index)
  switch (item.flags) {
    case MenuItemFlags.SubMenu:
      await showSubMenuAtEnter(menu.level, index, enterX, enterY)
      break
    default:
      await hideSubMenus(menu.level)
      break
  }
}
