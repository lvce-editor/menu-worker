import type { MenuState } from '../MenuState/MenuState.ts'
import * as TitleBarMenuBarStates from '../MenuStates/MenuStates.ts'

export interface WrappedFn {
  (uid: number, ...args: readonly any[]): Promise<void>
}

interface Fn {
  (state: MenuState, ...args: readonly any[]): MenuState | Promise<MenuState>
}

export const wrapCommand = (fn: Fn): WrappedFn => {
  const wrapped = async (uid: number, ...args: readonly any[]): Promise<void> => {
    const { newState } = TitleBarMenuBarStates.get(uid)
    const newerState = await fn(newState, ...args)
    if (newState === newerState) {
      return
    }
    const latest = TitleBarMenuBarStates.get(uid)
    TitleBarMenuBarStates.set(uid, latest.oldState, newerState)
  }
  return wrapped
}
