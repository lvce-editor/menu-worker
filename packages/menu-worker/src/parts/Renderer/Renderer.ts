import type { MenuState } from '../MenuState/MenuState.ts'

export interface Renderer {
  (oldState: MenuState, newState: MenuState): readonly any[]
}
