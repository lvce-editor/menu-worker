import type { MenuState } from '../MenuState/MenuState.ts'
import * as MouseEventType from '../MouseEventType/MouseEventType.ts'
import * as ViewletTitleBarMenuBarToggleIndex from './ViewletTitleBarMenuBarToggleIndex.ts'

export const handleClick = async (state: MenuState, button: number, index: number): Promise<MenuState> => {
  if (button !== MouseEventType.LeftClick) {
    return state
  }
  if (index === -1) {
    return state
  }
  return ViewletTitleBarMenuBarToggleIndex.toggleIndex(state, index)
}
