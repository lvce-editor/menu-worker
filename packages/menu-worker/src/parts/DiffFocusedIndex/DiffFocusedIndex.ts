import type { MenuState } from '../MenuState/MenuState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderFocusedIndex

export const isEqual = (oldState: MenuState, newState: MenuState): boolean => {
  return oldState.focusedIndex === newState.focusedIndex && oldState.isMenuOpen === newState.isMenuOpen
}
