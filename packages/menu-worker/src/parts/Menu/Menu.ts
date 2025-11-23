// TODO lazyload menuEntries and use Command.execute (maybe)
import { getMenuBounds } from '../GetMenuBounds/GetMenuBounds.ts'
import * as GetMenuEntriesWithKeyBindings from '../GetMenuEntriesWithKeyBindings/GetMenuEntriesWithKeyBindings.ts'
import * as GetMenuVirtualDom from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import * as GetVisibleMenuItems from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import { addMenuInternal, getCount, reset } from '../InternalMenuState/InternalMenuState.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const MENU_WIDTH = 150

const CONTEXT_MENU_WIDTH = 250

export const getMenuWidth = (): number => {
  return CONTEXT_MENU_WIDTH
}

export * from '../GetMenuHeight/GetMenuHeight.ts'

// TODO difference between focusing with mouse or keyboard
// with mouse -> open submenu
// with keyboard -> don't open submenu, only focus

// TODO handle printable letter and focus item that starts with that letter

// TODO pageup / pagedown keys

// TODO more tests

export const show = async (x: number, y: number, id: any, mouseBlocking = false, ...args: readonly any[]): Promise<void> => {
  const items = await GetMenuEntriesWithKeyBindings.getMenuEntriesWithKeyBindings(id, ...args)
  const bounds = getMenuBounds(x, y, items)
  const menu = addMenuInternal({
    id,
    items,
    focusedIndex: -1,
    level: getCount(),
    x: bounds.x,
    y: bounds.y,
  })
  const visible = GetVisibleMenuItems.getVisible(menu.items, -1, false, menu.level)
  const dom = GetMenuVirtualDom.getMenuVirtualDom(visible).slice(1)
  await RendererProcess.invoke(
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
  )
}

export const show2 = async (uid: number, menuId: any, x: number, y: number, mouseBlocking = false, ...args: readonly any[]): Promise<any> => {
  const items = await GetMenuEntriesWithKeyBindings.getMenuEntriesWithKeyBindings2(uid, menuId, ...args)
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
  await RendererProcess.invoke(
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
  )
}

export const hide = async (restoreFocus = true): Promise<void> => {
  if (getCount() === 0) {
    return
  }
  reset()
  await RendererProcess.invoke(/* Menu.hide */ 'Menu.hide', /* restoreFocus */ restoreFocus)
}
