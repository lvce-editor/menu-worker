import { ParseKey } from '@lvce-editor/constants'
import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as GetKeyBindingsString from '../GetKeyBindingsString/GetKeyBindingsString.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

export const getMenuItemDefaultDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { isFocused, key, label } = menuItem
  let className = ClassNames.MenuItem
  if (isFocused) {
    className += ' ' + ClassNames.MenuItemFocused
  }
  const dom: any[] = [
    {
      childCount: 1,
      className,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    text(label),
  ]
  if (key) {
    dom[0].childCount++
    const parsedKey = ParseKey.parseKey(key)
    const keyBindingsString = GetKeyBindingsString.getKeyBindingString(parsedKey.key, false, parsedKey.isCtrl, parsedKey.isShift, false)
    dom.push(
      {
        childCount: 1,
        className: ClassNames.MenuItemKeyBinding,
        type: VirtualDomElements.Span,
      },
      text(keyBindingsString),
    )
  }
  return dom
}
