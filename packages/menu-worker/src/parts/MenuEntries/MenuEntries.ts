import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as MenuEntriesEdit from '../MenuEntriesEdit/MenuEntriesEdit.ts'
import * as MenuEntriesFile from '../MenuEntriesFile/MenuEntriesFile.ts'
import * as MenuEntriesGo from '../MenuEntriesGo/MenuEntriesGo.ts'
import * as MenuEntriesHelp from '../MenuEntriesHelp/MenuEntriesHelp.ts'
import * as MenuEntriesOpenRecent from '../MenuEntriesOpenRecent/MenuEntriesOpenRecent.ts'
import * as MenuEntriesRun from '../MenuEntriesRun/MenuEntriesRun.ts'
import * as MenuEntriesSelection from '../MenuEntriesSelection/MenuEntriesSelection.ts'
import * as MenuEntriesTerminal from '../MenuEntriesTerminal/MenuEntriesTerminal.ts'
import * as MenuEntriesTitleBar from '../MenuEntriesTitleBar/MenuEntriesTitleBar.ts'
import * as MenuEntriesView from '../MenuEntriesView/MenuEntriesView.ts'

const menus = [
  MenuEntriesEdit,
  MenuEntriesFile,
  MenuEntriesGo,
  MenuEntriesHelp,
  MenuEntriesRun,
  MenuEntriesSelection,
  MenuEntriesTerminal,
  MenuEntriesTitleBar,
  MenuEntriesView,
  MenuEntriesOpenRecent,
]

export const getMenus = (): any => {
  return menus
}

export const getMenuEntries = async (id: any, ...args: any): Promise<any> => {
  // @ts-ignore
  return RendererWorker.invoke('Menu.getMenuEntries', id, ...args)
}

export const getMenuEntries2 = async (uid: any, menuId: number, ...args: readonly any[]): Promise<any> => {
  // @ts-ignore
  return RendererWorker.invoke('Menu.getMenuEntries2', uid, menuId, ...args)
}
