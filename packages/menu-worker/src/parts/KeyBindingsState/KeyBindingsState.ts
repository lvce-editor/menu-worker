import * as Assert from '../Assert/Assert.ts'
import * as Context from '../Context/Context.ts'
import * as Logger from '../Logger/Logger.ts'
import * as RendererProcess from '../RendererProcess/RendererProcess.ts'

export const state = {
  /**
   * @type {Uint32Array}
   */
  keyBindingIdentifiers: new Uint32Array(),
  keyBindings: [],
  keyBindingSets: Object.create(null),
  /**
   * @type {any}
   */
  matchingKeyBindings: [] as any[],
}

export const getKeyBinding = (identifier: any): any => {
  for (const keyBinding of state.matchingKeyBindings) {
    if (keyBinding.key === identifier) {
      return keyBinding
    }
  }
  return undefined
}

const getKey = (keyBinding: any): any => {
  return keyBinding.key
}

const matchesContext = (keyBinding: any): boolean => {
  if (!keyBinding.when) {
    return true
  }
  return Context.get(keyBinding.when)
}

const getMatchingKeyBindings = (keyBindingSets: any): any => {
  return Object.values(keyBindingSets).toReversed().flat().filter(matchesContext)
}

const getAvailableKeyBindings = (keyBindings: any): any => {
  return new Uint32Array(keyBindings.map(getKey))
}

export const update = async (): Promise<void> => {
  const matchingKeyBindings = getMatchingKeyBindings(state.keyBindingSets)
  const keyBindingIdentifiers = getAvailableKeyBindings(matchingKeyBindings)
  await RendererProcess.invoke('KeyBindings.setIdentifiers', keyBindingIdentifiers)
  state.matchingKeyBindings = matchingKeyBindings
  state.keyBindingIdentifiers = keyBindingIdentifiers
}

export const addKeyBindings = async (id: any, keyBindings: any): Promise<void> => {
  Assert.string(id)
  Assert.array(keyBindings)
  if (id in state.keyBindingSets) {
    Logger.warn(`cannot add keybindings multiple times: ${id}`)
    return
  }
  state.keyBindingSets[id] = keyBindings
  await update()
}

export const removeKeyBindings = async (id: any): Promise<void> => {
  const { keyBindingSets } = state
  if (!(id in keyBindingSets)) {
    Logger.warn(`cannot remove keybindings that are not registered: ${id}`)
    return
  }
  delete keyBindingSets[id]
  await update()
}

export const getKeyBindings = (): any => {
  return state.keyBindings
}
