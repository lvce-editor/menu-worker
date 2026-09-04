import { getMenuHideCommands } from '../GetMenuHideCommands/GetMenuHideCommands.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const hide = async (restoreFocus = true): Promise<void> => {
  const { commands } = await getMenuHideCommands(restoreFocus)
  if (commands.length > 0) {
    // @ts-ignore
    await RendererProcess.invoke(...commands)
  }
}
