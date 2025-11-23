/* eslint-disable @typescript-eslint/no-implied-eval */
const MENU_DELAY_TRIANGLE = 300

export const resolveAfterTimeout = (fn: any): void => {
  setTimeout(fn, MENU_DELAY_TRIANGLE)
}
