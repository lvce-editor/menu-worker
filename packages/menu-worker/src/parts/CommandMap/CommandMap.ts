import * as ContextMenu from '../ContextMenu/ContextMenu.ts'
import * as Diff2 from '../Diff2/Diff2.ts'
import * as GetCommands from '../GetCommands/GetCommands.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import { getMenuHideCommands } from '../GetMenuHideCommands/GetMenuHideCommands.ts'
import * as GetMenuIds from '../GetMenuIds/GetMenuIds.ts'
import { getMenuShowCommands } from '../GetMenuShowCommands/GetMenuShowCommands.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'Menu.getMenuEntries': GetMenuIds.getMenuEntries,
  'Menu.getMenuIds': GetMenuIds.getMenuIds,
  'Menu.handleContextMenu': HandleContextMenu.handleContextMenu,
  'Menu.renderEventListeners': RenderEventListeners.renderEventListeners,
  'Menu.diff2': Diff2.diff2,
  'Menu.getCommands': GetCommands.getCommandIds,
  'Menu.getKeyBindings': GetKeyBindings.getKeyBindings,
  'Menu.getMenus': MenuEntries.getMenus,
  'Menu.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'Menu.render2': Render2.render2,
  'Menu.saveState': SaveState.saveState,
  'Menu.show': ContextMenu.show,
  'Menu.show2': ContextMenu.show2,
  'Menu.getShowCommands': getMenuShowCommands,
  'Menu.getHideCommands': getMenuHideCommands,
}
