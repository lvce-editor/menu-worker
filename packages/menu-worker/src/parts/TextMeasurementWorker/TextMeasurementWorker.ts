import type { Rpc } from '@lvce-editor/rpc'
import { createTextMeasurementWorkerRpc } from '../CreateTextMeasurementWorkerRpc/CreateTextMeasurementWorkerRpc.ts'

let rpcPromise: Promise<Rpc> | undefined

const getRpc = (): Promise<Rpc> => {
  rpcPromise ||= createTextMeasurementWorkerRpc()
  return rpcPromise
}

export const measureTextWidth = async (
  text: string,
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
  isMonospaceFont: boolean,
  charWidth: number,
): Promise<number> => {
  const rpc = await getRpc()
  return rpc.invoke('TextMeasurement.measureTextWidth', text, fontWeight, fontSize, fontFamily, letterSpacing, isMonospaceFont, charWidth)
}

export const measureTextWidths = async (
  texts: readonly string[],
  fontWeight: number,
  fontSize: number,
  fontFamily: string,
  letterSpacing: number,
  isMonospaceFont: boolean,
  charWidth: number,
): Promise<readonly number[]> => {
  const rpc = await getRpc()
  return rpc.invoke('TextMeasurement.measureTextWidths', texts, fontWeight, fontSize, fontFamily, letterSpacing, isMonospaceFont, charWidth)
}
