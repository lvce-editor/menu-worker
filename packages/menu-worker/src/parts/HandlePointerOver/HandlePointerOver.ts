import type { MenuState } from '../MenuState/MenuState.ts'
import * as ViewletTitleBarMenuBarGetTitleBarIndexFromPosition from '../TitleBarMenuBar/ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.ts'
import * as ViewletTitleBarMenuBarHandleMouseOver from '../TitleBarMenuBar/ViewletTitleBarMenuBarHandleMouseOver.ts'

export const handlePointerOver = (state: MenuState, clientX: number, clientY: number): MenuState => {
  const index = ViewletTitleBarMenuBarGetTitleBarIndexFromPosition.getTitleBarIndexFromPosition(state.titleBarEntries, clientX - state.x, clientY)
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarHandleMouseOver.handleMouseOver(state, index)
}
