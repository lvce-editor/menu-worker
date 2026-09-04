import { expect, test } from '@jest/globals'
import { commandMap } from '../src/parts/CommandMap/CommandMap.ts'
import * as ContextMenu from '../src/parts/ContextMenu/ContextMenu.ts'
import { selectCurrent } from '../src/parts/SelectCurrent/SelectCurrent.ts'

test('commandMap registers Menu.selectCurrent', () => {
  expect(commandMap['Menu.selectCurrent']).toBe(selectCurrent)
})

test('commandMap registers Menu.show2Below', () => {
  expect(commandMap['Menu.show2Below']).toBe(ContextMenu.show2Below)
})
