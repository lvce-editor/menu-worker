import { RendererProcess } from '@lvce-editor/rpc-registry'
import { getMenuHeight } from '../GetMenuHeight/GetMenuHeight.ts'
import { getMenuVirtualDom } from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import { getVisible } from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import { addMenuInternal, get, getAll, getCount, set } from '../InternalMenuState/InternalMenuState.ts'
import { getMenuWidth, MENU_WIDTH } from '../Menu/Menu.ts'
import { getMenuEntries, getMenuEntries2 } from '../MenuEntries/MenuEntries.ts'

const getSubMenuItems = async (parentMenu: any, item: any): Promise<any> => {
  const args = item.args || parentMenu.args || []
  if (typeof parentMenu.uid === 'number') {
    return getMenuEntries2(parentMenu.uid, item.id, ...args)
  }
  return getMenuEntries(item.id, ...args)
}

const getOpenSubMenuToLeft = (parentMenu: any): boolean => {
  return parentMenu.openSubMenuToLeft === true || parentMenu.args?.[0]?.openSubMenuToLeft === true
}

const getSubMenuX = (parentMenu: any, openSubMenuToLeft: boolean): number => {
  return openSubMenuToLeft ? parentMenu.x - MENU_WIDTH : parentMenu.x + MENU_WIDTH
}

export const showSubMenuAtEnter = async (level: number, index: number, enterX: number, enterY: number): Promise<void> => {
  // TODO delete old menus
  set(getAll().slice(0, level + 1))
  const parentMenu = get(level)
  const item = parentMenu.items[index]
  const subMenuItems = await getSubMenuItems(parentMenu, item)
  const openSubMenuToLeft = getOpenSubMenuToLeft(parentMenu)
  const subMenu = addMenuInternal({
    args: item.args || parentMenu.args || [],
    enterX,
    enterY,
    focusedIndex: -1,
    id: item.id,
    items: subMenuItems,
    level: getCount(),
    openSubMenuToLeft,
    uid: parentMenu.uid,
    x: getSubMenuX(parentMenu, openSubMenuToLeft),
    y: parentMenu.y + index * 25,
  })
  const width = getMenuWidth()
  const height = getMenuHeight(subMenuItems)
  const visible = getVisible(subMenu.items, -1, false, subMenu.level)
  const dom = getMenuVirtualDom(visible).slice(1)
  await RendererProcess.invoke(
    /* Menu.showMenu */ 'Menu.showMenu',
    /* x */ subMenu.x,
    /* y */ subMenu.y,
    /* width */ width,
    /* height */ height,
    /* items */ subMenu.items,
    /* level */ subMenu.level,
    /* parentIndex */ index,
    /* dom */ dom,
  )
}

export const showSubMenu = async (level: number, index: number): Promise<void> => {
  return showSubMenuAtEnter(level, index, -1, -1)
}
