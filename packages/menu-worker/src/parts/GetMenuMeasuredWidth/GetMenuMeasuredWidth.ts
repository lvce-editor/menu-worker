import * as GetMenuLabelWidths from '../GetMenuLabelWidths/GetMenuLabelWidths.ts'

const MENU_MIN_WIDTH = 150
const MENU_ITEM_HORIZONTAL_PADDING = 56
const MENU_ITEM_HORIZONTAL_MARGIN = 8

export const getMenuMeasuredWidth = async (items: readonly any[]): Promise<number> => {
  const labelWidths = await GetMenuLabelWidths.getMenuLabelWidths(items)
  const maxLabelWidth = Math.max(0, ...labelWidths)
  return Math.ceil(Math.max(MENU_MIN_WIDTH, maxLabelWidth + MENU_ITEM_HORIZONTAL_PADDING + MENU_ITEM_HORIZONTAL_MARGIN))
}
