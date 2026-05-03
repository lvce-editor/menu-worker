import { expect, jest, test } from '@jest/globals'

const noop = (): void => {}

const hide = jest.fn<(restoreFocus: boolean) => Promise<void>>()
const executeMenuItemCommand = jest.fn<(item: Readonly<{ command: string }>) => Promise<void>>()

jest.unstable_mockModule('../src/parts/Hide/Hide.ts', () => {
  return {
    hide,
  }
})

jest.unstable_mockModule('../src/parts/ExecuteMenuItemCommand/ExecuteMenuItemCommand.ts', () => {
  return {
    executeMenuItemCommand,
  }
})

const { selectIndexRestoreFocus } = await import('../src/parts/SelectIndexRestoreFocus/SelectIndexRestoreFocus.ts')

test('selectIndexRestoreFocus hides the menu before executing the command', async () => {
  const item = {
    command: 'Dialog.openFolder',
  }
  let resolveHide = noop
  hide.mockImplementation(
    () =>
      new Promise<void>((resolve) => {
        resolveHide = resolve
      }),
  )
  executeMenuItemCommand.mockImplementation(async () => {})

  const promise = selectIndexRestoreFocus({}, item)

  expect(hide).toHaveBeenCalledWith(true)
  expect(executeMenuItemCommand).not.toHaveBeenCalled()

  resolveHide()
  await promise

  expect(executeMenuItemCommand).toHaveBeenCalledWith(item)
})
