import * as Diff2 from '../Diff2/Diff2.ts'
import * as GetCommands from '../GetCommands/GetCommands.ts'
import * as GetKeyBindings from '../GetKeyBindings/GetKeyBindings.ts'
import * as GetMenuIds from '../GetMenuIds/GetMenuIds.ts'
import * as HandleButtonsClick from '../HandleButtonsClick/HandleButtonsClick.ts'
import * as HandleContextMenu from '../HandleContextMenu/HandleContextMenu.ts'
import * as LoadContent from '../LoadContent/LoadContent.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'
import * as Render2 from '../Render2/Render2.ts'
import * as RenderEventListeners from '../RenderEventListeners/RenderEventListeners.ts'
import * as SaveState from '../SaveState/SaveState.ts'
import * as WrapCommand from '../WrapCommand/WrapCommand.ts'

export const commandMap = {
  'TitleBar.getMenuEntries': GetMenuIds.getMenuEntries,
  'TitleBar.getMenuIds': GetMenuIds.getMenuIds,
  'TitleBar.handleButtonsClick': HandleButtonsClick.handleClick,
  'TitleBar.handleContextMenu': HandleContextMenu.handleContextMenu,
  'TitleBar.renderEventListeners': RenderEventListeners.renderEventListeners,
  'TitleBarMenuBar.diff2': Diff2.diff2,
  'TitleBarMenuBar.getCommands': GetCommands.getCommandIds,
  'TitleBarMenuBar.getKeyBindings': GetKeyBindings.getKeyBindings,
  'TitleBarMenuBar.getMenus': MenuEntries.getMenus,
  'TitleBarMenuBar.loadContent': WrapCommand.wrapCommand(LoadContent.loadContent),
  'TitleBarMenuBar.render2': Render2.render2,
  'TitleBarMenuBar.saveState': SaveState.saveState,
}
