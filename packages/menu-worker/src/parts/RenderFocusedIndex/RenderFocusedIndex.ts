import { ViewletCommand } from '@lvce-editor/constants'
import type { MenuState } from '../MenuState/MenuState.ts'

export const renderFocusedIndex = (oldState: MenuState, newState: MenuState): readonly any[] => {
  if (newState.focusedIndex === -1) {
    return []
  }
  return [ViewletCommand.FocusSelector, '.ViewletTitleBarMenuBar']
}
