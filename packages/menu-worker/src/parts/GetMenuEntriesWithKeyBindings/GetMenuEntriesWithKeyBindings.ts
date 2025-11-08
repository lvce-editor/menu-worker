import * as GetCommandKeyBinding from '../GetCommandKeyBinding/GetCommandKeyBinding.ts'
import * as KeyBindingsState from '../KeyBindingsState/KeyBindingsState.ts'
import * as MenuEntries from '../MenuEntries/MenuEntries.ts'

const addKeyBindings = (menuEntries: readonly any[]): readonly any[] => {
  const keyBindings = KeyBindingsState.state.matchingKeyBindings
  const newMenuEntries = []
  for (const menuEntry of menuEntries) {
    const keyBinding = GetCommandKeyBinding.getCommandKeyBinding(keyBindings, menuEntry.command, menuEntry.args)
    const key = keyBinding ? keyBinding.key : 0
    const newMenuEntry = {
      ...menuEntry,
      key,
    }
    newMenuEntries.push(newMenuEntry)
  }
  return newMenuEntries
}

export const getMenuEntriesWithKeyBindings = async (id: any, ...args: readonly any[]): Promise<readonly any[]> => {
  const menuEntries = await MenuEntries.getMenuEntries(id, ...args)
  const newMenuEntries = addKeyBindings(menuEntries)
  return newMenuEntries
}

export const getMenuEntriesWithKeyBindings2 = async (uid: any, menuId: any, ...args: readonly any[]): Promise<any> => {
  // @ts-ignore
  const menuEntries = await MenuEntries.getMenuEntries2(uid, menuId, ...args)
  const newMenuEntries = addKeyBindings(menuEntries)
  return newMenuEntries
}
