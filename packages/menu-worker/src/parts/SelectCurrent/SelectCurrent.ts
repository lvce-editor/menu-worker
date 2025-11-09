import { get } from '../InternalMenuState/InternalMenuState.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const selectCurrent = async (level: number): Promise<void> => {
  const menu = get(level)
  await selectIndex(level, menu.focusedIndex)
}
