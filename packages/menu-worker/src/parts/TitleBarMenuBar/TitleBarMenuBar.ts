import type { MenuState } from '../MenuState/MenuState.ts'
import * as TitleBarMenuBarStates from '../MenuStates/MenuStates.ts'

export const create = (id: any, uri: any, x: any, y: any, width: any, height: any): MenuState => {
  const state: MenuState = {
    uid: id,
    titleBarEntries: [],
    focusedIndex: -1,
    isMenuOpen: false,
    menus: [],
    labelFontWeight: 400,
    labelFontSize: 13,
    labelFontFamily: 'system-ui, Ubuntu, Droid Sans, sans-serif',
    labelPadding: 8,
    labelLetterSpacing: 0,
    titleBarHeight: height,
    x,
    y,
    width,
    height,
  }
  TitleBarMenuBarStates.set(id, state, state)
  return state
}
