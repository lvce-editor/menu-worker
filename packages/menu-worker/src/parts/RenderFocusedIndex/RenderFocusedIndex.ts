import type { MenuState } from '../MenuState/MenuState.ts'

export const renderFocusedIndex = (oldState: MenuState, newState: MenuState): readonly any[] => {
  if (newState.focusedIndex === -1) {
    return []
  }
  return ['Viewlet.focusSelector', '.ViewletTitleBarMenuBar']
}
