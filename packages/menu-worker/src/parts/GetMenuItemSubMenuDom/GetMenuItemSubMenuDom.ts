import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const arrowRight: VirtualDomNode = {
  childCount: 0,
  className: ClassNames.MenuItemSubMenuArrowRight,
  type: VirtualDomElements.Div,
}

export const getMenuItemSubMenuDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { isExpanded, isFocused, label, level } = menuItem
  let className = ClassNames.MenuItem
  className += ' ' + ClassNames.MenuItemSubMenu
  if (isFocused) {
    className += ' ' + ClassNames.MenuItemFocused
  }
  return [
    {
      ariaExpanded: isExpanded,
      ariaHasPopup: true,
      ariaOwns: isExpanded ? `Menu-${level + 1}` : undefined,
      childCount: 2,
      className,
      role: AriaRoles.MenuItem,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    text(label),
    arrowRight,
  ]
}
