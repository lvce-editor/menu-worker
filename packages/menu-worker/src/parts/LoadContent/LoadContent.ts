import type { MenuState } from '../MenuState/MenuState.ts'

export const loadContent = async (state: MenuState, titleBarEntries: readonly any[]): Promise<MenuState> => {
  return {
    ...state,
  }
}
