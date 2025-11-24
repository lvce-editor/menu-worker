const MENU_DELAY_TRIANGLE = 300

export const resolveAfterTimeout = async (): Promise<void> => {
  const { resolve, promise } = Promise.withResolvers()
  setTimeout(resolve, MENU_DELAY_TRIANGLE)
  await promise
}
