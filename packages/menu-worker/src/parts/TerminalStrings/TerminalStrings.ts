import * as I18NString from '../I18NString/I18NString.ts'

/**
 * @enum {string}
 */
const UiStrings = {
  KillTerminal: 'Kill Terminal',
  NewTerminal: 'New Terminal',
  SplitTerminal: 'Split Terminal',
}

export const newTerminal = (): string => {
  return I18NString.i18nString(UiStrings.NewTerminal)
}
