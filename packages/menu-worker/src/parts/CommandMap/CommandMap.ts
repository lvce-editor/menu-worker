import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import { focusFirst } from '../FocusFirst/FocusFirst.ts'
import { focusNext } from '../FocusNext/FocusNext.ts'
import * as GetCommands from '../GetCommands/GetCommands.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import { getMenuHideCommands } from '../GetMenuHideCommands/GetMenuHideCommands.ts'
import * as GetMenuIds from '../GetMenuIds/GetMenuIds.ts'
import { getMenuShowCommands } from '../GetMenuShowCommands/GetMenuShowCommands.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import { handleMouseEnter } from '../HandleMouseEnter/HandleMouseEnter.ts'
import { handleMouseLeave } from '../HandleMouseLeave/HandleMouseLeave.ts'
import { hideSubMenus } from '../HideSubMenus/HideSubMenus.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import { showSubMenu } from '../ShowSubMenu/ShowSubMenu.ts'
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'Menu.diff2': Diff2.diff2,
  'Menu.focusFirst': focusFirst,
  'Menu.focusNext': focusNext,
  'Menu.getCommands': GetCommands.getCommandIds,
  'Menu.getHideCommands': getMenuHideCommands,
  'Menu.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Menu.getMenuEntries': GetMenuIds.getMenuEntries,
  'Menu.getMenuIds': GetMenuIds.getMenuIds,
  'Menu.getMenus': MenuEntries.getMenus,
  'Menu.getShowCommands': getMenuShowCommands,
  'Menu.handleContextMenu': HandleContextMenu.handleContextMenu,
  'Menu.handleMouseEnter': handleMouseEnter,
  'Menu.handleMouseLeave': handleMouseLeave,
  'Menu.hideSubMenus': hideSubMenus,
  'Menu.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'Menu.render2': Render2.render2,
  'Menu.renderEventListeners': RenderEventListeners.renderEventListeners,
  'Menu.saveState': SaveState.saveState,
  'Menu.show': ContextMenu.show,
  'Menu.show2': ContextMenu.show2,
  'Menu.showSubMenu': showSubMenu,
}
