// TODO lazyload menuEntries and use Command.execute (maybe)
import * as GetMenuEntriesWithKeyBindings from '../GetMenuEntriesWithKeyBindings/GetMenuEntriesWithKeyBindings.ts'
import * as GetMenuVirtualDom from '../GetMenuVirtualDom/GetMenuVirtualDom.ts'
import * as GetVisibleMenuItems from '../GetVisibleMenuItems/GetVisibleMenuItems.ts'
import { addMenuInternal, getCount, reset } from '../InternalMenuState/InternalMenuState.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
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

export const getIndexToFocusNextStartingAt = (items: any, startIndex: any): any => {
  for (let i = startIndex; i < startIndex + items.length; i++) {
    const index = i % items.length
    const item = items[index]
    if (canBeFocused(item)) {
      return index
    }
  }
  return -1
}

export const getIndexToFocusFirst = (items: any): any => {
  return getIndexToFocusNextStartingAt(items, 0)
}

export const getIndexToFocusLast = (items: any): any => {
  return getIndexToFocusPreviousStartingAt(items, items.length - 1)
}

// TODO this code seems a bit too complicated, maybe it can be simplified
const getIndexToFocusPreviousStartingAt = (items: any, startIndex: any): any => {
  for (let i = startIndex; i > startIndex - items.length; i--) {
    const index = (i + items.length) % items.length
    const item = items[index]
    if (canBeFocused(item)) {
      return index
    }
  }
  return -1
}

export const getIndexToFocusPrevious = (menu: any): any => {
  const startIndex = menu.focusedIndex === -1 ? menu.items.length - 1 : menu.focusedIndex - 1
  return getIndexToFocusPreviousStartingAt(menu.items, startIndex)
}

const canBeFocused = (item: any): any => {
  switch (item.flags) {
    case MenuItemFlags.Separator:
    case MenuItemFlags.Disabled:
      return false
    default:
      return true
  }
}

export const getIndexToFocusNext = (menu: any): any => {
  const startIndex = menu.focusedIndex + 1
  return getIndexToFocusNextStartingAt(menu.items, startIndex)
}

// TODO handle printable letter and focus item that starts with that letter

// TODO pageup / pagedown keys

// TODO more tests

const CONTEXT_MENU_ITEM_HEIGHT = 26
const CONTEXT_MENU_SEPARATOR_HEIGHT = 11
const CONTEXT_MENU_PADDING = 8

export const getMenuHeight = (items: readonly any[]): number => {
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
