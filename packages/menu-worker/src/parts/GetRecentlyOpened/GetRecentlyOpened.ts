import { RendererWorker } from '@lvce-editor/rpc-registry'

export const getRecentlyOpened = async (): Promise<any> => {
  const recentlyOpened = await RendererWorker.invoke(/* RecentlyOpened.getRecentlyOpened */ 'RecentlyOpened.getRecentlyOpened')
  return recentlyOpened
}
