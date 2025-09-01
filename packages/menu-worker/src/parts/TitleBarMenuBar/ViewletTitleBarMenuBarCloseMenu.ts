import type { MenuState } from '../MenuState/MenuState.ts'

export const closeMenu = (state: MenuState, keepFocus: boolean): MenuState => {
  const { focusedIndex } = state
  // TODO send to renderer process
  // 1. close menu
  // 2. focus top level entry
  const newFocusedIndex = keepFocus ? focusedIndex : -1
  return {
    ...state,
    menus: [],
    isMenuOpen: false,
    focusedIndex: newFocusedIndex,
  }
}
