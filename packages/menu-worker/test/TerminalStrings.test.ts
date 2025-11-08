import { expect, test } from '@jest/globals'
import * as TerminalStrings from '../src/parts/TerminalStrings/TerminalStrings.ts'

test('newTerminal', () => {
  expect(TerminalStrings.newTerminal()).toBe('New Terminal')
})
