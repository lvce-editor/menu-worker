import { beforeEach, expect, jest, test } from '@jest/globals'
import { focusFirst } from '../src/parts/FocusFirst/FocusFirst.ts'
import { focusLast } from '../src/parts/FocusLast/FocusLast.ts'
import { focusNext } from '../src/parts/FocusNext/FocusNext.ts'
import { focusPrevious } from '../src/parts/FocusPrevious/FocusPrevious.ts'
import * as InternalMenuState from '../src/parts/InternalMenuState/InternalMenuState.ts'
import * as MenuItemFlags from '../src/parts/MenuItemFlags/MenuItemFlags.ts'

beforeEach(() => {
  jest.resetAllMocks()
})

jest.unstable_mockModule('../src/parts/RendererProcess/RendererProcess.js', () => {
  return {
    invoke: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})
jest.unstable_mockModule('../src/parts/SharedProcess/SharedProcess.js', () => {
  return {
    invoke: jest.fn(() => {
      throw new Error('not implemented')
    }),
  }
})

const RendererProcess = await import('../src/parts/RendererProcess/RendererProcess.ts')
const SharedProcess = await import('../src/parts/SharedProcess/SharedProcess.ts')

const Menu = await import('../src/parts/Menu/Menu.ts')

test.skip('show', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  await Menu.show(0, 0, 'file')
  expect(RendererProcess.invoke).toHaveBeenCalledTimes(1)
  expect(RendererProcess.invoke).toHaveBeenCalledWith('Menu.show', 0, 0, 250, 200, 0, expect.any(Array))
})

test.skip('hide', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  await Menu.hide()
  expect(RendererProcess.invoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(RendererProcess.invoke).toHaveBeenCalledWith(909_090, 3, 7901)
})

test.skip('focusFirst', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusFirst()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(0)
})

test.skip('focusFirst - no items', async () => {
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [],
    },
  ])
  await focusFirst()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(-1)
})

test.skip('focusFirst - with disabled items and separators', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFile',
          name: 'new File',
        },
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          command: /* None */ 0,
          flags: MenuItemFlags.Separator,
          id: 'separator',
          label: 'Separator',
        },
        {
          command: /* None */ 0,
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusFirst()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(3)
})

test.skip('focusLast', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 0,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusLast()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(2)
})

test.skip('focusLast - no items', async () => {
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [],
    },
  ])
  await focusFirst()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(-1)
})

test.skip('focusLast - with disabled items and separators', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [
        {
          command: /* None */ 0,
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFile',
          name: 'new File',
        },
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          command: /* None */ 0,
          flags: MenuItemFlags.Separator,
          id: 'separator',
          label: 'Separator',
        },
      ],
    },
  ])
  await focusLast()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(0)
})

test.skip('focusPrevious', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 1,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusPrevious()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(0)
})

test.skip('focusPrevious - at start', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 0,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusPrevious()
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(2)
})

test.skip('focusPrevious - when no focus', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusPrevious()
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(2)
})

test.skip('focusPrevious - with separator', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: MenuItemFlags.Separator,
          id: 'separator',
          name: 'Separator',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusPrevious()
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(0)
})

test.skip('focusPrevious - with disabled items and separators', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFile',
          name: 'new File',
        },
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          command: /* None */ 0,
          flags: MenuItemFlags.Separator,
          id: 'separator',
          label: 'Separator',
        },
        {
          command: /* None */ 0,
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusPrevious()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(3)
})

test.skip('focusPrevious - no items', async () => {
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [],
    },
  ])
  await focusPrevious()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(-1)
})

test.skip('focusPrevious - no focusable items', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFile',
          name: 'new File',
        },
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          command: /* None */ 0,
          flags: MenuItemFlags.Separator,
          id: 'separator',
          label: 'Separator',
        },
      ],
    },
  ])
  await focusPrevious()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(-1)
})

test.skip('focusNext', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 0,
      items: [
        {
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          flags: /* None */ 0,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusNext()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(1)
})

// TODO also test focusPrevious with disabled items and separators

test.skip('focusNext - no items', async () => {
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [],
    },
  ])
  await focusNext()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(-1)
})

test.skip('focusNext - no focusable items', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFile',
          name: 'new File',
        },
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          command: /* None */ 0,
          flags: MenuItemFlags.Separator,
          id: 'separator',
          label: 'Separator',
        },
      ],
    },
  ])
  await focusNext()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(-1)
})

test.skip('focusNext - with disabled items and separators', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFile',
          name: 'new File',
        },
        {
          command: /* None */ 0,
          flags: /* Disabled */ 5,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          command: /* None */ 0,
          flags: MenuItemFlags.Separator,
          id: 'separator',
          label: 'Separator',
        },
        {
          command: /* None */ 0,
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusNext()
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(3)
})

test.skip('focusNext - at end', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusNext()
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(0)
})

test.skip('focusNext - when no focus', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: -1,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFolder',
          name: 'new Folder',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusNext()
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(0)
})

test.skip('focusNext - with separator', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 0,
      items: [
        {
          children: [],
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          children: [],
          flags: MenuItemFlags.Separator,
          id: 'separator',
          name: 'Separator',
        },
        {
          children: [],
          flags: /* None */ 0,
          id: 'newWindow',
          name: 'new Window',
        },
      ],
    },
  ])
  await focusNext()
  expect(InternalMenuState.getAll()[0].focusedIndex).toBe(2)
})

test.skip('resetFocusedIndex', async () => {
  // InternalMenuState.focs .focusedIndex = 2
  InternalMenuState.set([
    {
      children: [],
      flags: /* None */ 0,
      id: 'newFile',
      name: 'new File',
    },
    {
      children: [],
      flags: /* None */ 0,
      id: 'newFolder',
      name: 'new Folder',
    },
    {
      children: [],
      flags: /* None */ 0,
      id: 'newWindow',
      name: 'new Window',
    },
  ])
  // await resetFocusedIndex()
  // expect(InternalMenuState..focusedIndex).toBe(-1)
})

test.skip('focusIndexMouse - focusing submenu index should show submenu', async () => {
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  InternalMenuState.set([
    {
      focusedIndex: 0,
      items: [
        {
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          flags: MenuItemFlags.Separator,
          id: 'separator',
          name: 'Separator',
        },
        {
          flags: /* SubMenu */ 4,
          id: 'openRecent',
          name: 'Open Recent',
        },
      ],
      level: 0,
      x: 0,
      y: 0,
    },
  ])
  // @ts-ignore
  SharedProcess.invoke.mockImplementation((message) => {
    switch (message.method) {
      case 'FileSystem.readFile':
        return '["/test/folder-1"]'
      case 'Platform.getRecentlyOpenedPath':
        return '/test/recently-opened.json'
      default:
        throw new Error('unexpected message')
    }
  })
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  // @ts-ignore
  await handleMouseEnter(0, 2)
  expect(InternalMenuState.getAll()).toHaveLength(2)
  expect(RendererProcess.invoke).toHaveBeenCalledTimes(2)
  // @ts-ignore
  expect(RendererProcess.invoke).toHaveBeenNthCalledWith(2, [
    'Menu.show',
    150,
    50,
    250,
    116,
    [
      {
        args: ['/test/folder-1'],
        command: 7633,
        flags: 0,
        label: '/test/folder-1',
      },
      {
        command: 5432,
        flags: 1,
        id: 'separator',
        label: 'Separator',
      },
      {
        command: -1,
        flags: 0,
        id: 'more',
        label: 'More...',
      },
      {
        command: 5432,
        flags: 1,
        id: 'separator',
        label: 'Separator',
      },
      {
        command: 5432,
        flags: 0,
        id: 'clearRecentlyOpened',
        label: 'Clear Recently Opened',
      },
    ],
    1,
    2,
  ])
})

test.skip('focusIndexMouse - focusing submenu index should do nothing when already focused', async () => {
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [
        {
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          flags: MenuItemFlags.Separator,
          id: 'separator',
          name: 'Separator',
        },
        {
          flags: /* SubMenu */ 4,
          id: 'openRecent',
          name: 'Open Recent',
        },
      ],
      level: 0,
      x: 0,
      y: 0,
    },
    {
      focusedIndex: 0,
      items: [
        {
          command: -1,
          flags: 0,
          label: '/test/folder-1',
        },
        {
          command: 5432,
          flags: 1,
          id: 'separator',
          label: 'Separator',
        },
        {
          command: -1,
          flags: 0,
          id: 'more',
          label: 'More...',
        },
        {
          command: 5432,
          flags: 1,
          id: 'separator',
          label: 'Separator',
        },
        {
          command: 5432,
          flags: 0,
          id: 'clearRecentlyOpened',
          label: 'Clear Recently Opened',
        },
      ],
      level: 1,
      x: 0,
      y: 0,
    },
  ])
  // @ts-ignore
  SharedProcess.invoke.mockImplementation((message) => {
    switch (message.method) {
      case 'FileSystem.readFile':
        // @ts-ignore
        SharedProcess.state.receive({
          id: message.id,
          jsonrpc: '2.0',
          result: '["/test/folder-1"]',
        })
        break
      case 'Platform.getRecentlyOpenedPath':
        // @ts-ignore
        SharedProcess.state.receive({
          id: message.id,
          jsonrpc: '2.0',
          result: '/test/recently-opened.json',
        })
        break
      default:
        throw new Error('unexpected message')
    }
  })
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  // @ts-ignore
  await Menu.handleMouseEnter(0, 2)
  expect(InternalMenuState.getAll()).toHaveLength(2)
  expect(RendererProcess.invoke).not.toHaveBeenCalled()
})

test.skip('selectIndex - should do nothing when already focused', async () => {
  InternalMenuState.set([
    {
      focusedIndex: 2,
      items: [
        {
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          flags: MenuItemFlags.Separator,
          id: 'separator',
          name: 'Separator',
        },
        {
          flags: /* SubMenu */ 4,
          id: 'openRecent',
          name: 'Open Recent',
        },
      ],
      level: 0,
      x: 0,
      y: 0,
    },
    {
      focusedIndex: 0,
      items: [
        {
          command: -1,
          flags: 0,
          label: '/test/folder-1',
        },
        {
          command: 5432,
          flags: 1,
          id: 'separator',
          label: 'Separator',
        },
        {
          command: -1,
          flags: 0,
          id: 'more',
          label: 'More...',
        },
        {
          command: 5432,
          flags: 1,
          id: 'separator',
          label: 'Separator',
        },
        {
          command: 5432,
          flags: 0,
          id: 'clearRecentlyOpened',
          label: 'Clear Recently Opened',
        },
      ],
      level: 1,
      x: 0,
      y: 0,
    },
  ])
  // @ts-ignore
  SharedProcess.invoke.mockImplementation((message) => {
    switch (message.method) {
      case 'FileSystem.readFile':
        return '["/test/folder-1"]'
      case 'Platform.getRecentlyOpenedPath':
        return '/test/recently-opened.json'
      default:
        throw new Error('unexpected message')
    }
  })
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  // @ts-ignore
  await selectIndex(0, 2)
  expect(InternalMenuState.getAll()).toHaveLength(2)
  expect(RendererProcess.invoke).not.toHaveBeenCalled()
})

test.skip('focusIndexMouse - focusing other index should hide submenu', async () => {
  InternalMenuState.set([
    {
      focusedIndex: 0,
      items: [
        {
          flags: /* None */ 0,
          id: 'newFile',
          name: 'new File',
        },
        {
          flags: MenuItemFlags.Separator,
          id: 'separator',
          name: 'Separator',
        },
        {
          flags: /* SubMenu */ 4,
          id: 'openRecent',
          name: 'Open Recent',
        },
      ],
    },
    {
      focusedIndex: 0,
      items: [
        {
          flags: /* None */ 0,
          id: 'more',
          name: 'More...',
        },
      ],
    },
  ])
  // @ts-ignore
  RendererProcess.invoke.mockImplementation(() => {})
  // @ts-ignore
  await Menu.handleMouseEnter(0, 1)
  expect(InternalMenuState.getAll()).toHaveLength(1)
  expect(RendererProcess.invoke).toHaveBeenCalledTimes(1)
  // @ts-ignore
  expect(RendererProcess.invoke).toHaveBeenCalledWith(7904, 1)
})
