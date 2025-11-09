import { canBeFocused } from '../CanBeFocused/CanBeFocused.ts'
import { getCurrentMenu } from '../FocusFirst/FocusFirst.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

// TODO this code seems a bit too complicated, maybe it can be simplified
export const getIndexToFocusPreviousStartingAt = (items: readonly any[], startIndex: number): number => {
  for (let i = startIndex; i > startIndex - items.length; i--) {
    const index = (i + items.length) % items.length
    const item = items[index]
    if (canBeFocused(item)) {
      return index
    }
  }
  return -1
}

export const getIndexToFocusPrevious = (menu: any): number => {
  const startIndex = menu.focusedIndex === -1 ? menu.items.length - 1 : menu.focusedIndex - 1
  return getIndexToFocusPreviousStartingAt(menu.items, startIndex)
}

export const focusPrevious = async (): Promise<void> => {
  const menu = getCurrentMenu()
  if (menu.items.length === 0) {
    return
  }
  const indexToFocus = getIndexToFocusPrevious(menu)
  await focusIndex(menu, indexToFocus)
}
