import { expect, test } from '@jest/globals'
import * as PathDisplay from '../src/parts/PathDisplay/PathDisplay.ts'

test('getTitle with empty uri', () => {
  expect(PathDisplay.getTitle('', '')).toBe('')
  expect(PathDisplay.getTitle('/home/user', '')).toBe('')
})

test('getTitle with homeDir prefix', () => {
  expect(PathDisplay.getTitle('/home/user', '/home/user/project')).toBe('~/project')
  expect(PathDisplay.getTitle('/home/user', '/home/user')).toBe('~')
  expect(PathDisplay.getTitle('/home/user', '/home/user/sub/folder')).toBe('~/sub/folder')
})

test('getTitle with file:// protocol', () => {
  expect(PathDisplay.getTitle('', 'file:///path/to/file')).toBe('/path/to/file')
  expect(PathDisplay.getTitle('/home/user', 'file:///path/to/file')).toBe('/path/to/file')
  expect(PathDisplay.getTitle('/home/user', 'file:///home/user/project')).toBe('/home/user/project')
})

test('getTitle with homeDir and file:// protocol', () => {
  expect(PathDisplay.getTitle('/home/user', 'file:///home/user/project')).toBe('/home/user/project')
})

test('getTitle returns uri as is when no conditions match', () => {
  expect(PathDisplay.getTitle('', '/some/path')).toBe('/some/path')
  expect(PathDisplay.getTitle('/home/user', '/other/path')).toBe('/other/path')
  expect(PathDisplay.getTitle('/home/user', 'http://example.com')).toBe('http://example.com')
})

test('getTitle with empty homeDir', () => {
  expect(PathDisplay.getTitle('', '/path/to/file')).toBe('/path/to/file')
  expect(PathDisplay.getTitle('', 'file:///path/to/file')).toBe('/path/to/file')
})
