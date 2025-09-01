import type { MenuState } from '../MenuState/MenuState.ts'
import * as ViewletTitleBarMenuBarGetTitleBarIndexFromPosition from './ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.ts'
import * as ViewletTitleBarMenuBarHandleClick from './ViewletTitleBarMenuBarHandleClick.ts'

export const handleClickAt = async (state: MenuState, button: number, x: number, y: number): Promise<MenuState> => {
  const index = ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(state.titleBarEntries, x - state.x, y)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleClick.handleClick(state, button, index)
}
