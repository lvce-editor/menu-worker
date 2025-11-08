const matchesArgs = (a: any, b: any): boolean => {
  if (!a && !b) {
    return true
  }
  if ((!a && b) || (!b && a)) {
    return false
  }
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

export const getCommandKeyBinding = (keyBindings: readonly any[], command: any, args: any): any => {
  for (const keyBinding of keyBindings) {
    if (keyBinding.command === command && matchesArgs(keyBinding.args, args)) {
      return keyBinding
    }
  }
  return undefined
}
