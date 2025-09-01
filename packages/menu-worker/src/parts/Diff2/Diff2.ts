import * as Diff from '../Diff/Diff.ts'
import * as TitleBarMenuBarStates from '../MenuStates/MenuStates.ts'

export const diff2 = (uid: number): readonly number[] => {
  const { oldState, newState } = TitleBarMenuBarStates.get(uid)
  return Diff.diff(oldState, newState)
}
