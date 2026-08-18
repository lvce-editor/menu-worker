import { getAll } from '../InternalMenuState/InternalMenuState.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const closeSubMenu = async (): Promise<void> => {
  const menus = getAll()
  const parentMenu = menus.at(-1)
  // @ts-ignore
  await RendererProcess.invoke(/* Menu.hideSubMenu */ 7903, /* parentIndex */ parentMenu.focusedIndex)
}
