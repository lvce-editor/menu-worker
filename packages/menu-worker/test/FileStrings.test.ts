import { expect, test } from '@jest/globals'
import * as FileStrings from '../src/parts/FileStrings/FileStrings.ts'

test('newFile', () => {
  expect(FileStrings.newFile()).toBe('New File')
})

test('newWindow', () => {
  expect(FileStrings.newWindow()).toBe('New Window')
})

test('openFile', () => {
  expect(FileStrings.openFile()).toBe('Open File')
})

test('openFolder', () => {
  expect(FileStrings.openFolder()).toBe('Open Folder')
})

test('openRecent', () => {
  expect(FileStrings.openRecent()).toBe('Open Recent')
})

test('save', () => {
  expect(FileStrings.save()).toBe('Save')
})

test('saveAll', () => {
  expect(FileStrings.saveAll()).toBe('Save All')
})

test('exit', () => {
  expect(FileStrings.exit()).toBe('Exit')
})
