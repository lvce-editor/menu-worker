import { expect, test } from '@jest/globals'
import type { VisibleMenuItem } from '../src/parts/VisibleMenuItem/VisibleMenuItem.ts'
import * as AriaRoles from '../src/parts/AriaRoles/AriaRoles.ts'
import * as ClassNames from '../src/parts/ClassNames/ClassNames.ts'
import * as GetMenuItemSubMenuDom from '../src/parts/GetMenuItemSubMenuDom/GetMenuItemSubMenuDom.ts'
import * as VirtualDomElements from '../src/parts/VirtualDomElements/VirtualDomElements.ts'

test('getMenuItemSubMenuDom - basic case', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'File',
    level: 0,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    ariaExpanded: false,
    ariaHasPopup: true,
    ariaOwns: undefined,
    childCount: 2,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemSubMenu}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'File',
    type: VirtualDomElements.Text,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    className: ClassNames.MenuItemSubMenuArrowRight,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemSubMenuDom - focused case', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: true,
    key: 0,
    label: 'Edit',
    level: 0,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    ariaExpanded: false,
    ariaHasPopup: true,
    ariaOwns: undefined,
    childCount: 2,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemSubMenu} ${ClassNames.MenuItemFocused}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'Edit',
    type: VirtualDomElements.Text,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    className: ClassNames.MenuItemSubMenuArrowRight,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemSubMenuDom - expanded case', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: true,
    isFocused: false,
    key: 0,
    label: 'View',
    level: 1,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    ariaExpanded: true,
    ariaHasPopup: true,
    ariaOwns: 'Menu-2',
    childCount: 2,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemSubMenu}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'View',
    type: VirtualDomElements.Text,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    className: ClassNames.MenuItemSubMenuArrowRight,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemSubMenuDom - focused and expanded case', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: true,
    isFocused: true,
    key: 0,
    label: 'Help',
    level: 2,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result).toHaveLength(3)
  expect(result[0]).toEqual({
    ariaExpanded: true,
    ariaHasPopup: true,
    ariaOwns: 'Menu-3',
    childCount: 2,
    className: `${ClassNames.MenuItem} ${ClassNames.MenuItemSubMenu} ${ClassNames.MenuItemFocused}`,
    role: AriaRoles.MenuItem,
    tabIndex: -1,
    type: VirtualDomElements.Div,
  })
  expect(result[1]).toEqual({
    childCount: 0,
    text: 'Help',
    type: VirtualDomElements.Text,
  })
  expect(result[2]).toEqual({
    childCount: 0,
    className: ClassNames.MenuItemSubMenuArrowRight,
    type: VirtualDomElements.Div,
  })
})

test('getMenuItemSubMenuDom - different level', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: true,
    isFocused: false,
    key: 0,
    label: 'Submenu',
    level: 5,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result[0].ariaOwns).toBe('Menu-6')
})

test('getMenuItemSubMenuDom - not expanded should not have ariaOwns', () => {
  const menuItem: VisibleMenuItem = {
    flags: 0,
    isExpanded: false,
    isFocused: false,
    key: 0,
    label: 'Item',
    level: 3,
  }
  const result = GetMenuItemSubMenuDom.getMenuItemSubMenuDom(menuItem)
  expect(result[0].ariaOwns).toBeUndefined()
})
