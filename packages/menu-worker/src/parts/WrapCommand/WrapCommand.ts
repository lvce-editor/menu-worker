import type { MenuState } from '../MenuState/MenuState.ts'
import * as MenuStates from '../MenuStates/MenuStates.ts'

export interface WrappedFn {
  (uid: number, ...args: readonly any[]): Promise<void>
}

interface Fn {
  (state: MenuState, ...args: readonly any[]): MenuState | Promise<MenuState>
}

export const wrapCommand = (fn: Fn): WrappedFn => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = MenuStates.get(uid)
    const newerState = await fn(newState, ...args)
    if (newState === newerState) {
      return
    }
    const latest = MenuStates.get(uid)
    MenuStates.set(uid, latest.oldState, newerState)
  }
  return wrapped
}
