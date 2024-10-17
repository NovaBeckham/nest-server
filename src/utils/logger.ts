/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 16:32:58
 */

import chalk, { ChalkInstance } from 'chalk'

const renderTime = () => {
  const now = new Date()
  return `[${now.toLocaleDateString()} ${now.toLocaleTimeString()}]`
}

const renderScope = (scope: string) => {
  return chalk.green.underline(scope)
}

const renderMessage = (color: ChalkInstance, messages: any[]) => {
  return messages.map((m) => (typeof m === 'string' ? color(m) : m))
}

interface LoggerRenderOptions {
  consoler: (...messages: any[]) => void
  label: string
  color: ChalkInstance
  scope?: string
  time?: boolean
}

const renderLogger = (options: LoggerRenderOptions) => {
  return (...messages: any) => {
    const logs: any[] = []
    logs.push(options.label)
    if (options.time) {
      logs.push(renderTime())
    }
    if (options.scope) {
      logs.push(renderScope(options.scope))
    }
    return options.consoler(...logs, ...renderMessage(options.color, messages))
  }
}

interface LoggerOptions {
  scope?: string
  time?: boolean
}

export const createLogger = (opts?: LoggerOptions) => ({
  // levels
  log: renderLogger({ label: '⚪', consoler: console.log, color: chalk.cyanBright, ...opts }),
  info: renderLogger({ label: '🔵', consoler: console.info, color: chalk.greenBright, ...opts }),
  warn: renderLogger({ label: '🟠', consoler: console.warn, color: chalk.yellowBright, ...opts }),
  error: renderLogger({ label: '🔴', consoler: console.error, color: chalk.redBright, ...opts }),
  debug: renderLogger({ label: '🟤', consoler: console.debug, color: chalk.cyanBright, ...opts }),
  // aliases
  success: renderLogger({ label: '🟢', consoler: console.log, color: chalk.greenBright, ...opts }),
  failure: renderLogger({ label: '🔴', consoler: console.warn, color: chalk.redBright, ...opts })
})

export default createLogger()
