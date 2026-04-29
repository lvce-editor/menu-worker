import { initializeRendererProcess } from '../InitializeRendererProcess/InitializeRendererProcess.ts'
import { initializeRendererWorker } from '../InitializeRendererWorker/InitializeRendererWorker.ts'

export const listen = async (): Promise<void> => {
  await initializeRendererWorker()
  await initializeRendererProcess()
}
