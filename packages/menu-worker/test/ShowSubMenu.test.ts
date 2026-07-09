import { beforeEach, expect, jest, test } from '@jest/globals'
import * as InternalMenuState from '../src/parts/InternalMenuState/InternalMenuState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

const getMenuEntries = jest.fn(async (..._args: readonly any[]): Promise<any> => [])
const getMenuEntries2 = jest.fn(async (..._args: readonly any[]): Promise<any> => [])
const rendererInvoke = jest.fn()

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries,
  getMenuEntries2,
}))

jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  RendererProcess: {
    invoke: rendererInvoke,
  },
  RendererWorker: {
    invoke: jest.fn(),
  },
}))

const { showSubMenuAtEnter } = await import('../src/parts/ShowSubMenu/ShowSubMenu.ts')

beforeEach(() => {
  jest.resetAllMocks()
  InternalMenuState.reset()
})

test('showSubMenuAtEnter uses show2 uid and submenu args when parent menu has uid', async () => {
  getMenuEntries2.mockResolvedValue([
    {
      command: 'ActivityBar.handleClickSignOut',
      flags: MenuItemFlags.None,
      id: 'signOut',
      label: 'Sign Out',
    },
  ])
  InternalMenuState.set([
    {
      args: [{ menuId: 1 }],
      focusedIndex: 0,
      id: 1,
      items: [
        {
          args: [{ menuId: 2 }],
          command: '',
          flags: MenuItemFlags.SubMenu,
          id: 2,
          label: 'SimonSiefke (GitHub)',
        },
      ],
      level: 0,
      uid: 42,
      x: 10,
      y: 20,
    },
  ])

  await showSubMenuAtEnter(0, 0, 12, 24)

  expect(getMenuEntries).not.toHaveBeenCalled()
  expect(getMenuEntries2).toHaveBeenCalledWith(42, 2, { menuId: 2 })
  expect(InternalMenuState.getAll()[1]).toMatchObject({
    args: [{ menuId: 2 }],
    id: 2,
    uid: 42,
  })
  expect(rendererInvoke).toHaveBeenCalledWith(
    'Menu.showMenu',
    160,
    20,
    expect.any(Number),
    expect.any(Number),
    expect.any(Array),
    1,
    0,
    expect.any(Array),
  )
})
