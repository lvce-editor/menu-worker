import { expect, test } from '@jest/globals'
import * as PathDisplay from '../src/parts/PathDisplay/PathDisplay.ts'

test('getTitle - empty uri', () => {
  const result = PathDisplay.getTitle('/home/user', '')
  expect(result).toBe('')
})

test('getTitle - uri starts with homeDir', () => {
  const result = PathDisplay.getTitle('/home/user', '/home/user/project')
  expect(result).toBe('~/project')
})

test('getTitle - uri matches homeDir', () => {
  const result = PathDisplay.getTitle('/home/user', '/home/user')
  expect(result).toBe('~')
})

test('getTitle - uri starts with same prefix as homeDir', () => {
  const result = PathDisplay.getTitle('/home/user', '/home/user2/project')
  expect(result).toBe('/home/user2/project')
})

test('getTitle - uri starts with file protocol', () => {
  const result = PathDisplay.getTitle('/home/user', 'file:///path/to/file')
  expect(result).toBe('/path/to/file')
})

test('getTitle - file uri starts with homeDir', () => {
  const result = PathDisplay.getTitle('/home/user', 'file:///home/user/project')
  expect(result).toBe('~/project')
})

test('getTitle - decodes file uri path for display', () => {
  const result = PathDisplay.getTitle('/home/user', 'file:///home/user/workspace%20with%20spaces%20%E2%80%93%20%C3%BC')
  expect(result).toBe('~/workspace with spaces – ü')
})

test('getTitle - regular uri', () => {
  const result = PathDisplay.getTitle('/home/user', '/some/other/path')
  expect(result).toBe('/some/other/path')
})

test('getTitle - empty homeDir', () => {
  const result = PathDisplay.getTitle('', '/path/to/file')
  expect(result).toBe('/path/to/file')
})

test('getHomeDir - linux home path', () => {
  const result = PathDisplay.getHomeDir('/home/user/project')
  expect(result).toBe('/home/user')
})

test('getHomeDir - macos home file uri', () => {
  const result = PathDisplay.getHomeDir('file:///Users/user/project')
  expect(result).toBe('/Users/user')
})

test('getHomeDir - other path', () => {
  const result = PathDisplay.getHomeDir('/usr/lib/lvce/resources/app/playground')
  expect(result).toBe('')
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
