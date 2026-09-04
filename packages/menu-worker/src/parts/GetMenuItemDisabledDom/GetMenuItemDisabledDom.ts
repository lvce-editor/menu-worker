import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import * as MergeClassNames from '../MergeClassNames/MergeClassNames.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'
import { text } from '../VirtualDomHelpers/VirtualDomHelpers.ts'

const disabled: VirtualDomNode = {
  ariaDisabled: true,
  childCount: 1,
  className: MergeClassNames.mergeClassNames(ClassNames.MenuItem, ClassNames.MenuItemDisabled),
  disabled: true,
  role: AriaRoles.MenuItem,
  tabIndex: -1,
  type: VirtualDomElements.Div,
}

export const getMenuItemDisabledDom = (menuItem: VisibleMenuItem): readonly VirtualDomNode[] => {
  const { label } = menuItem
  return [disabled, text(label)]
}
