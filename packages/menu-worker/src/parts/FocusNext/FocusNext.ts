import { getCurrentMenu, getIndexToFocusNextStartingAt } from '../FocusFirst/FocusFirst.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

export const getIndexToFocusNext = (menu: any): number => {
  const startIndex = menu.focusedIndex + 1
  return getIndexToFocusNextStartingAt(menu.items, startIndex)
}

export const focusNext = async (): Promise<void> => {
  const menu = getCurrentMenu()
  if (menu.items.length === 0) {
    return
  }
  const indexToFocus = getIndexToFocusNext(menu)
  await focusIndex(menu, indexToFocus)
}
