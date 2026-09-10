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
test('getTitle displays remote SSH paths and hosts', () => {
  expect(PathDisplay.getTitle('/home/user', 'remote-ssh://dev/home/user/project')).toBe('/home/user/project [SSH: dev]')
  expect(PathDisplay.getTitle('', 'remote-ssh://dev:2222/work/my%20project')).toBe('/work/my project [SSH: dev:2222]')
  expect(PathDisplay.getTitle('', 'remote-ssh://[::1]/work')).toBe('/work [SSH: [::1]]')
  expect(PathDisplay.getTitle('', 'remote-ssh://dev')).toBe('/ [SSH: dev]')
})

test('getTitle preserves malformed remote SSH uris', () => {
  for (const uri of ['remote-ssh://[', 'remote-ssh://dev/%ZZ', 'remote-ssh:///work']) {
    expect(PathDisplay.getTitle('', uri)).toBe(uri)
  }
})
