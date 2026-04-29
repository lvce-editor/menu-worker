import { getSelectIndexFunction } from '../GetSelectIndexFunction/GetSelectIndexFunction.ts'
import { get } from '../InternalMenuState/InternalMenuState.ts'

export const selectIndex = async (level: number, index: number): Promise<any> => {
  const menu = get(level)
  // TODO avoid assignment
  menu.focusedIndex = index
  const item = menu.items[menu.focusedIndex]
  const fn = getSelectIndexFunction(item.flags)
  await fn(menu, item, index)
}
