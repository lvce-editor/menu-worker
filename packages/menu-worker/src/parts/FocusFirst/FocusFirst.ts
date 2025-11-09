import { canBeFocused } from '../CanBeFocused/CanBeFocused.ts'
import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import { getAll, getCount } from '../InternalMenuState/InternalMenuState.ts'
import * as Logger from '../Logger/Logger.js'

export const getCurrentMenu = (): any => {
  if (getCount() === 0) {
    Logger.warn('menu not available')
  }
  return getAll().at(-1)
}

export const getIndexToFocusNextStartingAt = (items: any, startIndex: number): number => {
  for (let i = startIndex; i < startIndex + items.length; i++) {
    const index = i % items.length
    const item = items[index]
    if (canBeFocused(item)) {
      return index
    }
  }
  return -1
}

export const getIndexToFocusFirst = (items: readonly any[]): number => {
  return getIndexToFocusNextStartingAt(items, 0)
}

export const focusFirst = async (): Promise<void> => {
  const menu = getCurrentMenu()
  if (getCount() === 0) {
    return
  }
  const indexToFocus = getIndexToFocusFirst(menu.items)
  await focusIndex(menu, indexToFocus)
}
