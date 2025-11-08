import { expect, test } from '@jest/globals'
import * as Workspace from '../src/parts/Workspace/Workspace.ts'

test('getHomeDir returns empty string', () => {
  expect(Workspace.getHomeDir()).toBe('')
})
