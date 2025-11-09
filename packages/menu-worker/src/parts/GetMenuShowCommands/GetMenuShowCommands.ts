// TODO lazyload menuEntries and use Command.execute (maybe)
import * as GetMenuVirtualDom from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import * as GetVisibleMenuItems from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import { addMenuInternal, getAll, getCount } from '../InternalMenuState/InternalMenuState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'

const CONTEXT_MENU_WIDTH = 250

// TODO difference between focusing with mouse or keyboard
// with mouse -> open submenu
// with keyboard -> don't open submenu, only focus

// TODO this code seems a bit too complicated, maybe it can be simplified

// TODO handle printable letter and focus item that starts with that letter

// TODO pageup / pagedown keys

// TODO more tests

const CONTEXT_MENU_ITEM_HEIGHT = 26
const CONTEXT_MENU_SEPARATOR_HEIGHT = 11
const CONTEXT_MENU_PADDING = 8

const getMenuHeight = (items: readonly any[]): number => {
  let height = CONTEXT_MENU_PADDING
  for (const item of items) {
    switch (item.flags) {
      case MenuItemFlags.Separator:
        height += CONTEXT_MENU_SEPARATOR_HEIGHT
        break
      default:
        height += CONTEXT_MENU_ITEM_HEIGHT
        break
    }
  }
  return height
}

const getMenuBounds = (x: number, y: number, items: readonly any[]): any => {
  const menuWidth = CONTEXT_MENU_WIDTH
  const menuHeight = getMenuHeight(items)
  const layoutState = { points: [0, 0] }
  const windowWidth = layoutState.points[0]
  const windowHeight = layoutState.points[1]
  // TODO maybe only send labels and keybindings to ui (id not needed on ui)
  // TODO what about separators?

  if (x + menuWidth > windowWidth) {
    x -= menuWidth
  }
  if (y + menuHeight > windowHeight) {
    y -= menuHeight
  }

  return {
    x,
    y,
    width: menuWidth,
    height: menuHeight,
  }
}

export const getMenuShowCommands = async (items: any, menuId: any, x: number, y: number, mouseBlocking = false): Promise<any> => {
  const bounds = getMenuBounds(x, y, items)
  const menu = addMenuInternal({
    id: menuId,
    items,
    focusedIndex: -1,
    level: getCount(),
    x: bounds.x,
    y: bounds.y,
  })
  const visible = GetVisibleMenuItems.getVisible(menu.items, -1, false, menu.level)
  const dom = GetMenuVirtualDom.getMenuVirtualDom(visible).slice(1)
  return {
    menus: getAll(),
    menu,
    commands: [
      /* Menu.show */ 'Menu.showMenu',
      /* x */ bounds.x,
      /* y */ bounds.y,
      /* width */ bounds.width,
      /* height */ bounds.height,
      /* items */ menu.items,
      /* level */ menu.level,
      /* parentIndex */ -1,
      /* dom */ dom,
      /* mouseBlocking */ mouseBlocking,
    ],
  }
}
