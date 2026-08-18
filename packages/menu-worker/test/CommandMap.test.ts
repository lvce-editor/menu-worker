import { expect, test } from '@jest/globals'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import { selectCurrent } from '../src/parts/SelectCurrent/SelectCurrent.ts'

test('commandMap registers Menu.selectCurrent', () => {
  expect(commandMap['Menu.selectCurrent']).toBe(selectCurrent)
})
