import type { VirtualDomNode } from '../VirtualDomNode/VirtualDomNode.ts'
import type { VisibleMenuItem } from '../VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../AriaRoles/AriaRoles.ts'
import * as ClassNames from '../ClassNames/ClassNames.ts'
import { getMenuItemVirtualDom } from '../GetMenuItemVirtualDom/GetMenuItemVirtualDom.ts'
import * as VirtualDomElements from '../VirtualDomElements/VirtualDomElements.ts'

export const getMenuVirtualDom = (menuItems: readonly VisibleMenuItem[]): readonly VirtualDomNode[] => {
  const dom: readonly VirtualDomNode[] = [
    {
      childCount: menuItems.length,
      className: ClassNames.Menu,
      role: AriaRoles.Menu,
      tabIndex: -1,
      type: VirtualDomElements.Div,
    },
    ...menuItems.flatMap(getMenuItemVirtualDom),
  ]
  return dom
}
