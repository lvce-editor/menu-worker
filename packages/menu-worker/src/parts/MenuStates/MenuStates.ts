import type { MenuState } from '../MenuState/MenuState.ts'
import * as ViewletRegistry from '../ViewletRegistry/ViewletRegistry.ts'

export const { get, set } = ViewletRegistry.create<MenuState>()
