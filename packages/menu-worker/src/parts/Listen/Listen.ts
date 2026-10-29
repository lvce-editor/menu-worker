import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeRendererProcess } from '../InitializeRendererProcess/InitializeRendererProcess.ts'

export const listen = async (): Promise<void> => {
  await RendererWorker.initializeRendererWorkerForWorker(CommandMap.commandMap)
  await initializeRendererProcess()
}
