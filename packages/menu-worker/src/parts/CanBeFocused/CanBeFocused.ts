import { MenuItemFlags } from '@lvce-editor/constants'

export const canBeFocused = (item: any): boolean => {
  switch (item.flags) {
    case MenuItemFlags.Separator:
    case MenuItemFlags.Disabled:
      return false
    default:
      return true
  }
}
