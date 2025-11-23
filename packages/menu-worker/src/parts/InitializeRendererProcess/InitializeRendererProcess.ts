import { RendererProcess } from '@lvce-editor/rpc-registry'
import { createRendererProcessRpc } from '../CreateRendererProcessRpc/CreateRendererProcessRpc.ts'

export const initializeRendererProcess = async (): Promise<void> => {
  const rpc = await createRendererProcessRpc()
  RendererProcess.set(rpc)
}
