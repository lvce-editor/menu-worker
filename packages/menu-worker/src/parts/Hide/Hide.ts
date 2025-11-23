import { RendererProcess } from '@lvce-editor/rpc-registry'
import { getMenuHideCommands } from '../GetMenuHideCommands/GetMenuHideCommands.ts'

export const hide = async (restoreFocus = true): Promise<void> => {
  const { commands } = await getMenuHideCommands(restoreFocus)
  if (commands.length > 0) {
    // @ts-ignore
    await RendererProcess.invoke(...commands)
  }
}
