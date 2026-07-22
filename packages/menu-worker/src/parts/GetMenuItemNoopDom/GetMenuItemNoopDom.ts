import { VirtualDomElements } from '@lvce-editor/constants'
import { text, type VirtualDomNode } from '@lvce-editor/virtual-dom-worker'
import type { MenuItemRenderer } from '../MenuItemRenderer/MenuItemRenderer.ts'

const unsupportedMenuItemNode: VirtualDomNode = {
  childCount: 1,
  type: VirtualDomElements.Div,
}

export const getMenuItemsNoopDom: MenuItemRenderer = () => {
  return [unsupportedMenuItemNode, text(`Unsupport menu item type`)]
}
