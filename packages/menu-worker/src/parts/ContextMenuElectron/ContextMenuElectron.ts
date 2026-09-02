import * as ElectronContextMenu from '../ElectronContextMenu/ElectronContextMenu.ts'

export const show = (x: number, y: number, id: any, ...args: readonly unknown[]): Promise<void> => {
  return ElectronContextMenu.openContextMenu(x, y, id, ...args)
}
