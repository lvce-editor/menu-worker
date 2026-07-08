import * as TextMeasurementWorker from '../TextMeasurementWorker/TextMeasurementWorker.ts'

const FontWeight = 400
const FontSize = 13
const FontFamily = 'system-ui, Ubuntu, Droid Sans, sans-serif'
const LetterSpacing = 0
const IsMonospaceFont = false
const CharWidth = 8

const getLabels = (items: readonly any[]): readonly string[] => {
  return items.map((item) => item.label).filter((label) => typeof label === 'string' && label)
}

export const getMenuLabelWidths = async (items: readonly any[]): Promise<readonly number[]> => {
  const labels = getLabels(items)
  return TextMeasurementWorker.measureTextWidths(labels, FontWeight, FontSize, FontFamily, LetterSpacing, IsMonospaceFont, CharWidth)
}
