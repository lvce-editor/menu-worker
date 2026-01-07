import { VirtualDomElements } from '@lvce-editor/constants'
import { text } from '@lvce-editor/virtual-dom-worker'
import type { MenuItemRenderer } from '../MenuItemRenderer/MenuItemRenderer.ts'

export const getMenuItemsNoopDom: MenuItemRenderer = () => {
  return [
    {
      childCount: 1,
      type: VirtualDomElements.Div,
    },
    text(`Unsupport menu item type`),
  ]
}
