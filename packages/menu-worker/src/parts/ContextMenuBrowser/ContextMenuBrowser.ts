import * as Menu from '../Menu/Menu.ts'

export const show = async (x: number, y: number, id: any, ...args: readonly any[]): Promise<void> => {
  // @ts-ignore
  await Menu.hide()
  // TODO handle error
  // TODO race condition
  await Menu.show(x, y, id, /* mouseBlocking */ true, ...args)
  // TODO maybe only send labels and keybindings to ui (id not needed on ui)
  // TODO what about separators?
}

export const show2 = async (uid: number, menuId: number, x: number, y: number, ...args: readonly any[]): Promise<void> => {
  // @ts-ignore
  await Menu.hide()
  // TODO handle error
  // TODO race condition
  await Menu.show2(uid, menuId, x, y, /* mouseBlocking */ true, ...args)
  // TODO maybe only send labels and keybindings to ui (id not needed on ui)
  // TODO what about separators?
}
