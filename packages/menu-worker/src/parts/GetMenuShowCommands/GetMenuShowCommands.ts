// TODO lazyload menuEntries and use Command.execute (maybe)
import { getMenuBounds } from '../GetMenuBounds/GetMenuBounds.ts'
import * as GetMenuVirtualDom from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import * as GetVisibleMenuItems from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import { addMenuInternal, getAll, getCount } from '../InternalMenuState/InternalMenuState.ts'

// TODO difference between focusing with mouse or keyboard
// with mouse -> open submenu
// with keyboard -> don't open submenu, only focus

// TODO this code seems a bit too complicated, maybe it can be simplified

// TODO handle printable letter and focus item that starts with that letter

// TODO pageup / pagedown keys

// TODO more tests

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
