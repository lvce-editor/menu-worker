import { MenuItemFlags } from '@lvce-editor/constants'
import { selectIndexDefault } from '../SelectIndexDefault/SelectIndexDefault.ts'
import { selectIndexIgnore } from '../SelectIndexIgnore/SelectIndexIgnore.ts'
import { selectIndexNone } from '../SelectIndexNone/SelectIndexNone.ts'
import { selectIndexRestoreFocus } from '../SelectIndexRestoreFocus/SelectIndexRestoreFocus.ts'
import { selectIndexSubMenu } from '../SelectIndexSubMenu/SelectIndexSubMenu.ts'

export const getSelectIndexFunction = (flags: number): any => {
  switch (flags) {
    case MenuItemFlags.Checked:
      return selectIndexRestoreFocus
    case MenuItemFlags.Ignore:
      return selectIndexIgnore
    case MenuItemFlags.None:
      return selectIndexNone
    case MenuItemFlags.RestoreFocus:
      return selectIndexRestoreFocus
    case MenuItemFlags.SubMenu:
      return selectIndexSubMenu
    case MenuItemFlags.Unchecked:
      return selectIndexRestoreFocus
    default:
      return selectIndexDefault
  }
}
