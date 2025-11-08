import { expect, test } from '@jest/globals'
import * as DiffType from '../src/parts/DiffType/DiffType.ts'
import * as GetRenderer from '../src/parts/GetRenderer/GetRenderer.ts'
import * as RenderFocusedIndex from '../src/parts/RenderFocusedIndex/RenderFocusedIndex.ts'
import * as RenderMenus from '../src/parts/RenderMenus/RenderMenus.ts'

test('getRenderer returns renderFocusedIndex for RenderFocusedIndex diffType', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderFocusedIndex)
  expect(renderer).toBe(RenderFocusedIndex.renderFocusedIndex)
})

test('getRenderer returns renderMenus for RenderMenus diffType', () => {
  const renderer = GetRenderer.getRenderer(DiffType.RenderMenus)
  expect(renderer).toBe(RenderMenus.renderMenus)
})

test('getRenderer throws error for unknown diffType', () => {
  expect(() => {
    GetRenderer.getRenderer(999)
  }).toThrow('unknown renderer')
})
