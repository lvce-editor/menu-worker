import { getCurrentMenu } from '../FocusFirst/FocusFirst.ts'
import { getCount } from '../InternalMenuState/InternalMenuState.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const selectCurrent = async (): Promise<void> => {
  if (getCount() === 0) {
    return
  }
  const menu = getCurrentMenu()
  if (menu.focusedIndex < 0) {
    return
  }
  await selectIndex(menu.level, menu.focusedIndex)
}
