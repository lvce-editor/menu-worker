import { get, getCount } from '../InternalMenuState/InternalMenuState.ts'
import { selectIndex } from '../SelectIndex/SelectIndex.ts'

export const selectItem = (text: string) => {
  for (let level = 0; level < getCount(); level++) {
    const menu = get(level)
    for (let i = 0; i < menu.items.length; i++) {
      const item = menu.items[i]
      if (item.label === text) {
        return selectIndex(level, i)
      }
    }
  }
  throw new Error(`menu item not found: ${text}`)
}
