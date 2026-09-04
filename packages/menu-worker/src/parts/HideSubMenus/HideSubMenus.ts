import { getAll, getCount, set } from '../InternalMenuState/InternalMenuState.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const hideSubMenus = async (level: number): Promise<void> => {
  if (level < getCount()) {
    set(getAll().slice(0, level + 1))
    await RendererProcess.invoke('Menu.hideSubMenu', /* level */ level + 1)
  }
}
