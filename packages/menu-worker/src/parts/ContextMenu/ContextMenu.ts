import * as Assert from '../Assert/Assert.ts'
import * as ContextMenuBrowser from '../ContextMenuBrowser/ContextMenuBrowser.js'
import * as ContextMenuElectron from '../ContextMenuElectron/ContextMenuElectron.js'
import * as PlatformType from '../PlatformType/PlatformType.ts'
import * as Preferences from '../Preferences/Preferences.ts'

const hasContextMenuNativePreference = async (): Promise<boolean> => {
  const value = await Preferences.get('window.titleBarStyle')
  return value === 'native'
}

const getModule = async (platform: number): Promise<any> => {
  if (platform === PlatformType.Electron && (await hasContextMenuNativePreference())) {
    return ContextMenuElectron
  }
  return ContextMenuBrowser
}

export const show = async (x: number, y: number, id: number, ...args: readonly any[]): Promise<void> => {
  Assert.number(x)
  Assert.number(y)
  Assert.number(id)
  const platform = 0
  const module = await getModule(platform)
  return module.show(x, y, id, ...args)
}

export const show2 = async (uid: number, menuId: number, x: number, y: number, ...args: readonly any[]): Promise<void> => {
  Assert.number(uid)
  Assert.number(menuId)
  Assert.number(x)
  Assert.number(y)
  const platform = 0
  const module = getModule(platform)
  // @ts-ignore
  return module.show2(uid, menuId, x, y, ...args)
}
