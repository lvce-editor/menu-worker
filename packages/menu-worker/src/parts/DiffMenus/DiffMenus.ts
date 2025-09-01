import type { MenuState } from '../MenuState/MenuState.ts'
import * as DiffType from '../DiffType/DiffType.ts'

export const diffType = DiffType.RenderMenus

export const isEqual = (oldState: MenuState, newState: MenuState): boolean => {
  return oldState.menus === newState.menus
}
