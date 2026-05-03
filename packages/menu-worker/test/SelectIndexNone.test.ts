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

const { selectIndexNone } = await import('../src/parts/SelectIndexNone/SelectIndexNone.ts')

test('selectIndexNone hides the menu before executing the command', async () => {
  const item = {
    command: 'Main.save',
  }
  let resolveHide = noop
  hide.mockImplementation(
    () =>
      new Promise<void>((resolve) => {
        resolveHide = resolve
      }),
  )
  executeMenuItemCommand.mockImplementation(async () => {})

  const promise = selectIndexNone({}, item)

  expect(hide).toHaveBeenCalledWith(false)
  expect(executeMenuItemCommand).not.toHaveBeenCalled()

  resolveHide()
  await promise

  expect(executeMenuItemCommand).toHaveBeenCalledWith(item)
})
