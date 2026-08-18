import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const focusIndex = async (menu: any, index: number): Promise<any> => {
  if (menu.items.length === 0) {
    return
  }
  const oldFocusedIndex = menu.focusedIndex
  menu.focusedIndex = index
  await RendererProcess.invoke('Menu.focusIndex', /* level */ menu.level, /* oldFocusedIndex */ oldFocusedIndex, /* newFocusedIndex */ index)
}
