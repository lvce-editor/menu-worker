import { MenuItemFlags } from '@lvce-editor/constants'

export const canBeFocused = (item: any): boolean => {
  switch (item.flags) {
    case MenuItemFlags.Disabled:
    case MenuItemFlags.Separator:
      return false
    default:
      return true
  }
}
