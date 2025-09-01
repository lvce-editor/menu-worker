import type { MenuState } from '../MenuState/MenuState.ts'
import * as Assert from '../Assert/Assert.ts'
import { openMenuAtIndex } from './ViewletTitleBarMenuBarOpenMenuAtIndex.ts'

export const focusIndex = async (state: MenuState, index: number): Promise<MenuState> => {
  Assert.object(state)
  Assert.number(index)
  const { isMenuOpen, focusedIndex } = state
  if (index === focusedIndex) {
    return state
  }
  if (isMenuOpen) {
    return openMenuAtIndex(state, index, /* focus */ false)
  }

  return {
    ...state,
    focusedIndex: index,
  }
}
