import { RendererProcess } from '@lvce-editor/rpc-registry'
import { getMenuHeight } from '../GetMenuHeight/GetMenuHeight.ts'
import { getMenuVirtualDom } from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import { getVisible } from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import { addMenuInternal, get, getAll, getCount, set } from '../InternalMenuState/InternalMenuState.ts'
import { getMenuWidth, MENU_WIDTH } from '../Menu/Menu.ts'
import { getMenuEntries } from '../MenuEntries/MenuEntries.ts'

export const showSubMenuAtEnter = async (level: number, index: number, enterX: number, enterY: number): Promise<void> => {
  // TODO delete old menus
  set(getAll().slice(0, level + 1))
  const parentMenu = get(level)
  const item = parentMenu.items[index]
  const subMenuItems = await getMenuEntries(item.id)
  const subMenu = addMenuInternal({
    id: item.id,
    items: subMenuItems,
    focusedIndex: -1,
    level: getCount(),
    y: parentMenu.y + index * 25,
    x: parentMenu.x + MENU_WIDTH,
    enterX,
    enterY,
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
