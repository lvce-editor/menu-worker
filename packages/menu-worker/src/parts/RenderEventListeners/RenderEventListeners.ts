import type { DomEventListener } from '../DomEventListener/DomEventListener.ts'
import * as DomEventListenerFunctions from '../DomEventListenerFunctions/DomEventListenerFunctions.ts'

export const renderEventListeners = (): readonly DomEventListener[] => {
  return [
    {
      name: DomEventListenerFunctions.HandleFocusIn,
      params: ['handleFocus'],
    },
    {
      name: DomEventListenerFunctions.HandleMenuClick,
      params: ['handleMenuClick', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenerFunctions.HandleMenuMouseOver,
      params: ['handleMenuMouseOver', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenerFunctions.HandleClick,
      params: ['handleClickAt', 'event.button', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenerFunctions.HandlePointerOut,
      params: ['handlePointerOut', 'event.clientX', 'event.clientY'],
    },
    {
      name: DomEventListenerFunctions.HandlePointerOver,
      params: ['handlePointerOver', 'event.clientX', 'event.clientY'],
    },
  ]
}
