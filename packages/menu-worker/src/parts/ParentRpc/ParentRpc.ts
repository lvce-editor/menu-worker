import type { Rpc } from '@lvce-editor/rpc'
import { RendererWorker } from '@lvce-editor/rpc-registry'

export const invoke = (method: string, ...params: readonly unknown[]): Promise<unknown> => {
  return RendererWorker.invoke(method, ...params)
}

export const set = (rpc: Rpc): void => {
  RendererWorker.set(rpc)
}
