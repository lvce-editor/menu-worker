import * as ElectronMenuItemFlags from '../ElectronMenuItemFlags/ElectronMenuItemFlags.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as RendererWorker from '../RendererWorker/RendererWorker.ts'

const convertMenuItem = (menuItem: any): any => {
  const { flags, label } = menuItem
  switch (flags) {
    case MenuItemFlags.Separator:
      return {
        type: ElectronMenuItemFlags.Separator,
      }
    default:
      return {
        label,
      }
  }
}

const convertMenuItems = (menuItems: readonly any[]): readonly any[] => {
  return menuItems.map(convertMenuItem)
}

const getItem = (items: any, label: any): any => {
  for (const item of items) {
    if (item.label === label) {
      return item
    }
  }
  return undefined
}

export const openContextMenu = async (x: any, y: any, id: any, ...args: readonly any[]): Promise<void> => {
  const entries = await MenuEntries.getMenuEntries(id, ...args)
  const electronMenuItems = convertMenuItems(entries)
  const event = await RendererWorker.invoke('ElectronContextMenu.openContextMenu', electronMenuItems, x, y)
  if (event.type === 'close') {
    return
  }
  const item = getItem(entries, event.data)
  if (!item) {
    return
  }
  const commandArgs = item.args || []
  await RendererWorker.invoke(item.command, ...commandArgs)
}
