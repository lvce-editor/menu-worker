import type { MenuState } from '../MenuState/MenuState.ts'
import * as GetTitleBarMenuBarVirtualDom from '../GetTitleBarMenuBarVirtualDom/GetTitleBarMenuBarVirtualDom.ts'
import * as GetVisibleTitleBarEntries from '../GetVisibleTitleBarEntries/GetVisibleTitleBarEntries.ts'

export const renderEntries = (oldState: MenuState, newState: MenuState): readonly any[] => {
  const visibleEntries = GetVisibleTitleBarEntries.getVisibleTitleBarEntries(
    newState.titleBarEntries,
    newState.width,
    newState.focusedIndex,
    newState.isMenuOpen,
  )
  const dom = GetTitleBarMenuBarVirtualDom.getTitleBarMenuBarVirtualDom(visibleEntries, newState.focusedIndex)
  return ['Viewlet.setDom2', newState.uid, dom]
}
