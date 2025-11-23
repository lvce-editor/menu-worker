import * as Preferences from '../Preferences/Preferences.ts'

export const hasContextMenuNativePreference = async (): Promise<boolean> => {
  const value = await Preferences.get('window.titleBarStyle')
  return value === 'native'
}
