import type { MenuState } from '../MenuState/MenuState.ts'
import { focusIndex } from './ViewletTitleBarMenuBarFocusIndex.ts'

export const handleMouseOutMenuClosed = (state: MenuState): Promise<MenuState> => {
  return focusIndex(state, -1)
}
