import { beforeEach, expect, jest, test } from '@jest/globals'
import * as InternalMenuState from '../src/parts/InternalMenuState/InternalMenuState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

const getMenuEntries = jest.fn(async (..._args: readonly any[]): Promise<any> => [])
const getMenuEntries2 = jest.fn(async (..._args: readonly any[]): Promise<any> => [])
const rendererInvoke = jest.fn()
const getMenuMeasuredWidth = jest.fn(async (_items: readonly any[]): Promise<number> => 220)

jest.unstable_mockModule('../src/parts/GetMenuMeasuredWidth/GetMenuMeasuredWidth.ts', () => ({
  getMenuMeasuredWidth,
}))

jest.unstable_mockModule('../src/parts/MenuEntries/MenuEntries.ts', () => ({
  getMenuEntries,
  getMenuEntries2,
}))

jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.js', () => ({
  invoke: rendererInvoke,
}))

jest.unstable_mockModule('@lvce-editor/rpc-registry', () => ({
  RendererWorker: {
    invoke: jest.fn(),
  },
}))

const { showSubMenuAtEnter } = await import('../src/parts/ShowSubMenu/ShowSubMenu.ts')
const { selectIndex } = await import('../src/parts/SelectIndex/SelectIndex.ts')

beforeEach(() => {
  jest.resetAllMocks()
  getMenuMeasuredWidth.mockResolvedValue(220)
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
          label: 'Test User (GitHub)',
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

test.each([150, 220, 300])('opens the submenu to the left using its measured width of %i', async (width) => {
  getMenuMeasuredWidth.mockResolvedValue(width)
  getMenuEntries2.mockResolvedValue([])
  InternalMenuState.set([
    {
      args: [{ menuId: 1, openSubMenuToLeft: true }],
      focusedIndex: 0,
      id: 1,
      items: [
        {
          args: [{ menuId: 2 }],
          command: '',
          flags: MenuItemFlags.SubMenu,
          id: 2,
          label: 'Test User (GitHub)',
        },
      ],
      level: 0,
      uid: 42,
      x: 500,
      y: 20,
    },
  ])

  await showSubMenuAtEnter(0, 0, 12, 24)

  expect(InternalMenuState.getAll()[1]).toMatchObject({
    openSubMenuToLeft: true,
    x: 500 - width,
  })
  expect(rendererInvoke).toHaveBeenCalledWith(
    'Menu.showMenu',
    500 - width,
    20,
    expect.any(Number),
    expect.any(Number),
    expect.any(Array),
    1,
    0,
    expect.any(Array),
  )
})

test('showSubMenuAtEnter does nothing when the submenu is already open', async () => {
  getMenuEntries2.mockResolvedValue([])
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
          label: 'Appearance',
        },
      ],
      level: 0,
      uid: 42,
      x: 10,
      y: 20,
    },
  ])

  await showSubMenuAtEnter(0, 0, 12, 24)
  await showSubMenuAtEnter(0, 0, 13, 25)

  expect(getMenuEntries2).toHaveBeenCalledTimes(1)
  expect(rendererInvoke).toHaveBeenCalledTimes(1)
  expect(InternalMenuState.getAll()).toHaveLength(2)
})

test('left submenu remains on screen when its parent is near the left edge', async () => {
  getMenuEntries2.mockResolvedValue([])
  InternalMenuState.set([
    {
      args: [{ openSubMenuToLeft: true }],
      focusedIndex: 0,
      id: 95,
      items: [{ args: [{ menuId: 95, subMenu: 'category' }], flags: MenuItemFlags.SubMenu, id: 95, label: 'Category' }],
      level: 0,
      uid: 42,
      x: 100,
      y: 20,
    },
  ])

  await showSubMenuAtEnter(0, 0, 100, 20)

  expect(InternalMenuState.getAll()[1]).toMatchObject({ openSubMenuToLeft: true, x: 0 })
})

test.each([-1, 0])('selecting a submenu opens it when the focused index is %i', async (focusedIndex) => {
  getMenuEntries2.mockResolvedValue([{ command: 'Extensions.filterByCategory', flags: MenuItemFlags.None, id: 'themes', label: 'Themes' }])
  InternalMenuState.set([
    {
      args: [{ openSubMenuToLeft: true }],
      focusedIndex,
      id: 95,
      items: [{ args: [{ menuId: 95, subMenu: 'category' }], flags: MenuItemFlags.SubMenu, id: 95, label: 'Category' }],
      level: 0,
      uid: 42,
      x: 500,
      y: 20,
    },
  ])

  await selectIndex(0, 0)

  expect(getMenuEntries2).toHaveBeenCalledWith(42, 95, { menuId: 95, subMenu: 'category' })
  expect(InternalMenuState.getAll()).toHaveLength(2)
  expect(InternalMenuState.getAll()[1].items[0].label).toBe('Themes')

  await selectIndex(0, 0)

  expect(getMenuEntries2).toHaveBeenCalledTimes(1)
  expect(InternalMenuState.getAll()).toHaveLength(2)
})
