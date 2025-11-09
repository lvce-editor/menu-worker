import { canBeFocused } from '../CanBeFocused/CanBeFocused.ts'
import { getCurrentMenu } from '../FocusFirst/FocusFirst.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'

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

export const getIndexToFocusLast = (items: readonly any[]): number => {
  return getIndexToFocusPreviousStartingAt(items, items.length - 1)
}

export const focusLast = async (): Promise<any> => {
  const menu = getCurrentMenu()
  const indexToFocus = getIndexToFocusPreviousStartingAt(menu.items, menu.items.length - 1)
  await focusIndex(menu, indexToFocus)
}
