import { expect, test } from '@jest/globals'
import * as EditorStrings from '../src/parts/EditorStrings/EditorStrings.ts'

test('cut', () => {
  expect(EditorStrings.cut()).toBe('Cut')
})

test('copy', () => {
  expect(EditorStrings.copy()).toBe('Copy')
})

test('paste', () => {
  expect(EditorStrings.paste()).toBe('Paste')
})

test('undo', () => {
  expect(EditorStrings.undo()).toBe('Undo')
})

test('redo', () => {
  expect(EditorStrings.redo()).toBe('Redo')
})

test('toggleLineComment', () => {
  expect(EditorStrings.toggleLineComment()).toBe('Toggle Line Comment')
})

test('toggleBlockComment', () => {
  expect(EditorStrings.toggleBlockComment()).toBe('Toggle Block Comment')
})

test('selectAll', () => {
  expect(EditorStrings.selectAll()).toBe('Select All')
})

test('copyLineUp', () => {
  expect(EditorStrings.copyLineUp()).toBe('Copy Line Up')
})

test('copyLineDown', () => {
  expect(EditorStrings.copyLineDown()).toBe('Copy Line Down')
})

test('moveLineUp', () => {
  expect(EditorStrings.moveLineUp()).toBe('Move Line Up')
})

test('moveLineDown', () => {
  expect(EditorStrings.moveLineDown()).toBe('Move Line Down')
})
