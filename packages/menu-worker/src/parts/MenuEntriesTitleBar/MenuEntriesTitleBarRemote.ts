import * as MenuEntryId from '../MenuEntryId/MenuEntryId.ts'
import * as MenuItemFlags from '../MenuItemFlags/MenuItemFlags.ts'
import * as ViewletTitleBarStrings from '../TitleBarStrings/TitleBarStrings.ts'

export const getMenuEntries = (): any => {
  return [
    {
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.File,
      label: ViewletTitleBarStrings.file(),
    },
    {
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Edit,
      label: ViewletTitleBarStrings.edit(),
    },
    {
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Selection,
      label: ViewletTitleBarStrings.selection(),
    },
    {
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.View,
      label: ViewletTitleBarStrings.view(),
    },
    {
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Go,
      label: ViewletTitleBarStrings.go(),
    },
    {
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Run,
      keyboardShortCut: 'Alt+r',
      label: ViewletTitleBarStrings.run(),
    },
    {
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Terminal,
      keyboardShortCut: 'Alt+t',
      label: ViewletTitleBarStrings.terminal(),
    },
    {
      flags: MenuItemFlags.SubMenu,
      id: MenuEntryId.Help,
      keyboardShortCut: 'Alt+h',
      label: ViewletTitleBarStrings.help(),
    },
  ]
}
