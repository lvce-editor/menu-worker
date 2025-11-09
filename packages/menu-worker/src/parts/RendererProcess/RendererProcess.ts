import { RendererWorker } from '@lvce-editor/rpc-registry'

export const invoke = async (method: string, ...params: readonly any[]): Promise<any> => {
  // @ts-ignore
  await RendererWorker.invoke('WebView.compatRendererProcessInvoke', method, ...params)
}
