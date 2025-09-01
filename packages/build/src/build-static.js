import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { root } from './root.js'
import { cp } from 'node:fs/promises'

const sharedProcessPath = join(root, 'packages', 'server', 'node_modules', '@lvce-editor', 'shared-process', 'index.js')

const sharedProcessUrl = pathToFileURL(sharedProcessPath).toString()

const sharedProcess = await import(sharedProcessUrl)

process.env.PATH_PREFIX = '/menu-worker'
const { commitHash } = await sharedProcess.exportStatic({
  root,
  extensionPath: '',
})

await cp(
  join(root, '.tmp', 'dist', 'dist', 'menuWorkerMain.js'),
  join(root, 'dist', commitHash, 'packages', 'menu-worker-worker', 'dist', 'menuWorkerMain.js'),
)

const nodeModulesPath = join(root, 'packages', 'server', 'node_modules')

// @ts-ignore
const serverStaticPath = join(nodeModulesPath, '@lvce-editor', 'static-server', 'static')

// await cp(
//   join(serverStaticPath, commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js.original'),
//   join(root, 'dist', commitHash, 'packages', 'renderer-worker', 'dist', 'rendererWorkerMain.js'),
// )

await cp(join(root, 'dist'), join(root, '.tmp', 'static'), { recursive: true })
