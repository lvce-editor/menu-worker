// TODO lazyload menuEntries and use Command.execute (maybe)
import * as GetMenuMeasuredWidth from '../GetMenuMeasuredWidth/GetMenuMeasuredWidth.ts'
import { getMenuHeight } from '../GetMenuHeight/GetMenuHeight.ts'

const MENU_TARGET_GAP = 5

// TODO difference between focusing with mouse or keyboard
// with mouse -> open submenu
// with keyboard -> don't open submenu, only focus

// TODO this code seems a bit too complicated, maybe it can be simplified

// TODO handle printable letter and focus item that starts with that letter

// TODO pageup / pagedown keys

// TODO more tests

export interface MenuViewport {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

export const getMenuBounds = async (
  x: number,
  y: number,
  items: readonly any[],
  openBelow = false,
  viewport: MenuViewport = { x: 0, y: 0, width: Number.POSITIVE_INFINITY, height: Number.POSITIVE_INFINITY },
): Promise<any> => {
  const menuWidth = await GetMenuMeasuredWidth.getMenuMeasuredWidth(items)
  const menuHeight = getMenuHeight(items)
  const right = viewport.x + viewport.width
  const bottom = viewport.y + viewport.height
  // TODO maybe only send labels and keybindings to ui (id not needed on ui)
  // TODO what about separators?

  if (x + menuWidth > right) {
    x -= menuWidth + MENU_TARGET_GAP
    x = Math.max(x, viewport.x)
  }
  if (!openBelow && y + menuHeight > bottom) {
    y -= menuHeight
    y = Math.max(y, viewport.y)
  }

  x = Math.max(viewport.x, Math.min(x, right - menuWidth))
  if (!openBelow) y = Math.max(viewport.y, Math.min(y, bottom - menuHeight))

  return {
    height: menuHeight,
    width: menuWidth,
    x,
    y,
  }
}
