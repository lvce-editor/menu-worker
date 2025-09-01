import type { MenuState } from '../MenuState/MenuState.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOverMenuOpen = async (state: MenuState, index: number): Promise<MenuState> => {
  if (index === -1) {
    return state
  }
  return focusIndex(state, index)
}
