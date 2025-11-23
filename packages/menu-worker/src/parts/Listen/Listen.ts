import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { initializeRendererProcess } from '../InitializeRendererProcess/InitializeRendererProcess.ts'

export const listen = async (): Promise<void> => {
  const rpc = await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
  RendererWorker.set(rpc)
  await initializeRendererProcess()
}
