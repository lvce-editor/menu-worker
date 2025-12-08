/* eslint-disable @typescript-eslint/prefer-readonly-parameter-types */
// TODO lazyload menuEntries and use Command.execute (maybe)

// TODO difference between focusing with mouse or keyboard
// with mouse -> open submenu
// with keyboard -> don't open submenu, only focus

// TODO this code seems a bit too complicated, maybe it can be simplified

interface State {
  enterTimeout: number
  latestTimeStamp: number
  menus: any[]
}
const state: State = {
  enterTimeout: -1,
  latestTimeStamp: 0,
  menus: [],
}

export const addMenuInternal = (menu: any): any => {
  if (state.menus.length > 5) {
    throw new Error('too many menus')
  }
  state.menus.push(menu)
  return menu
}

export const getCount = (): number => {
  return state.menus.length
}

export const reset = (): void => {
  state.menus = []
}

export const get = (index: number): any => {
  return state.menus[index]
}

export const set = (menus: any[]): void => {
  state.menus = menus
}

export const getAll = (): any[] => {
  return state.menus
}

export const setTimestamp = (timestamp: number): void => {
  state.latestTimeStamp = timestamp
}

export const getLatestTimestamp = (): number => {
  return state.latestTimeStamp
}
