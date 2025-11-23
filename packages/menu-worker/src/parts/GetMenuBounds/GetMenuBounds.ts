// TODO lazyload menuEntries and use Command.execute (maybe)
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

export const getMenuBounds = (x: number, y: number, items: readonly any[]): any => {
  const menuWidth = CONTEXT_MENU_WIDTH
  const menuHeight = getMenuHeight(items)
  const layoutState = { points: [0, 0] }
  const windowWidth = layoutState.points[0]
  const windowHeight = layoutState.points[1]
  // TODO maybe only send labels and keybindings to ui (id not needed on ui)
  // TODO what about separators?

  if (x + menuWidth > windowWidth) {
    x -= menuWidth
    x = Math.max(x, 0)
  }
  if (y + menuHeight > windowHeight) {
    y -= menuHeight
    y = Math.max(y, 0)
  }

  return {
    x,
    y,
    width: menuWidth,
    height: menuHeight,
  }
}
