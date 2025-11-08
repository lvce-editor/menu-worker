import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemSubMenuDom from '../src/parts/GetMenuItemSubMenuDom/GetMenuItemSubMenuDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemSubMenuDom - basic case', () => {
  const menuItem: VisibleMenuItem = {
    label: 'File',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemSubMenu}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    ariaHasPopup: true,
    ariaExpanded: false,
    ariaOwns: undefined,
    childCount: 2,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'File',
    childCount: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.MenuItemSubMenuArrowRight,
    childCount: 0,
  })
})

test('getMenuItemSubMenuDom - focused case', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Edit',
    flags: 0,
    isFocused: true,
    isExpanded: false,
    level: 0,
    key: 0,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemSubMenu} ${ClassNames.MenuItemFocused}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    ariaHasPopup: true,
    ariaExpanded: false,
    ariaOwns: undefined,
    childCount: 2,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Edit',
    childCount: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.MenuItemSubMenuArrowRight,
    childCount: 0,
  })
})

test('getMenuItemSubMenuDom - expanded case', () => {
  const menuItem: VisibleMenuItem = {
    label: 'View',
    flags: 0,
    isFocused: false,
    isExpanded: true,
    level: 1,
    key: 0,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemSubMenu}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    ariaHasPopup: true,
    ariaExpanded: true,
    ariaOwns: 'Menu-2',
    childCount: 2,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'View',
    childCount: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.MenuItemSubMenuArrowRight,
    childCount: 0,
  })
})

test('getMenuItemSubMenuDom - focused and expanded case', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Help',
    flags: 0,
    isFocused: true,
    isExpanded: true,
    level: 2,
    key: 0,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    type: VirtualDomElements.Div,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemSubMenu} ${ClassNames.MenuItemFocused}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    ariaHasPopup: true,
    ariaExpanded: true,
    ariaOwns: 'Menu-3',
    childCount: 2,
  })
  expect(result[1]).toEqual({
    type: VirtualDomElements.Text,
    text: 'Help',
    childCount: 0,
  })
  expect(result[2]).toEqual({
    type: VirtualDomElements.Div,
    className: ClassNames.MenuItemSubMenuArrowRight,
    childCount: 0,
  })
})

test('getMenuItemSubMenuDom - different level', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Submenu',
    flags: 0,
    isFocused: false,
    isExpanded: true,
    level: 5,
    key: 0,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result[0].ariaOwns).toBe('Menu-6')
})

test('getMenuItemSubMenuDom - not expanded should not have ariaOwns', () => {
  const menuItem: VisibleMenuItem = {
    label: 'Item',
    flags: 0,
    isFocused: false,
    isExpanded: false,
    level: 3,
    key: 0,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result[0].ariaOwns).toBeUndefined()
})
