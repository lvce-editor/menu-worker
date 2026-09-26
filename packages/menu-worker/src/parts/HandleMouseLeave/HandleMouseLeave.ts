import { focusIndex } from '../FocusIndex/FocusIndex.ts'
import { get, getCount } from '../InternalMenuState/InternalMenuState.ts'

export const handleMouseLeave = async (level: number): Promise<void> => {
  if (level >= getCount()) {
    return
  }
  const menu = get(level)
  if (menu.items.length === 0 || menu.focusedIndex === -1) {
    return
  }
  await focusIndex(menu, -1)
}
