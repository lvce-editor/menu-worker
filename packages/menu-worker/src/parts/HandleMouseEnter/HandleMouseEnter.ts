/* eslint-disable @typescript-eslint/no-implied-eval */
import { get, getCount, getLatestTimestamp, setTimestamp } from '../InternalMenuState/InternalMenuState.ts'
import { showSubMenuAtEnter } from '../ShowSubMenu/ShowSubMenu.ts'

const MENU_DELAY_TRIANGLE = 300

const resolveAfterTimeout = (fn: any): void => {
  setTimeout(fn, MENU_DELAY_TRIANGLE)
}

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
    case /* SubMenu */ 4:
      await showSubMenuAtEnter(menu.level, index, enterX, enterY)
      break
    default:
      await hideSubMenus(menu.level)
      break
  }
}
