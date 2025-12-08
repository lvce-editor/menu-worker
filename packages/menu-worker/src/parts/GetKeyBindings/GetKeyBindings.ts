import { KeyCode } from '@lvce-editor/virtual-dom-worker'
import type { KeyBinding } from '../KeyBinding/KeyBinding.ts'
import * as WhenExpression from '../WhenExpression/WhenExpression.ts'

export const getKeyBindings = (): readonly KeyBinding[] => {
  return [
    {
      command: 'TitleBarMenuBar.handleKeyArrowDown',
      key: KeyCode.DownArrow,
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      command: 'TitleBarMenuBar.handleKeyArrowUp',
      key: KeyCode.UpArrow,
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      command: 'TitleBarMenuBar.handleKeyArrowRight',
      key: KeyCode.RightArrow,
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      command: 'TitleBarMenuBar.handleKeyArrowLeft',
      key: KeyCode.LeftArrow,
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      command: 'TitleBarMenuBar.handleKeySpace',
      key: KeyCode.Space,
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      command: 'TitleBarMenuBar.handleKeyHome',
      key: KeyCode.Home,
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      command: 'TitleBarMenuBar.handleKeyEnd',
      key: KeyCode.End,
      when: WhenExpression.FocusTitleBarMenuBar,
    },
    {
      command: 'TitleBarMenuBar.handleKeyEscape',
      key: KeyCode.Escape,
      when: WhenExpression.FocusTitleBarMenuBar,
    },
  ]
}
