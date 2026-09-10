import * as Protocol from '../Protocol/Protocol.ts'

export const getTitle = (homeDir: string, uri: string): string => {
  if (!uri) {
    return ''
  }
  if (uri.startsWith('remote-ssh://')) {
    try {
      const parsed = new URL(uri)
      if (parsed.host) {
        return `${decodeURIComponent(parsed.pathname) || '/'} [SSH: ${parsed.host}]`
      }
    } catch {
      return uri
    }
  }
  // TODO tree shake this out in web
  if (homeDir && uri.startsWith(homeDir)) {
    return `~${uri.slice(homeDir.length)}`
  }
  if (uri.startsWith(Protocol.File)) {
    return uri.slice(Protocol.File.length)
  }
  return uri
}
