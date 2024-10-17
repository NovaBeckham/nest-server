/*
 * @Description:
 * @Author: hyx
 * @Date: 2024-10-17 17:19:30
 */

import path from 'path'
import yargs from 'yargs'

const ROOT_PATH = path.join(__dirname, '..')

const argv = yargs.argv as Record<string, string | void>

export const APP = {
  PORT: 8000,
  ROOT_PATH,
  DEFAULT_CACHE_TTL: 0,
  // MASTER: 'Surmon',
  NAME: 'NodePress',
  // URL: 'https://api.surmon.me',
  ADMIN_EMAIL: argv.admin_email || 'admin email, e.g. admin@example.com',
  FE_NAME: 'Nova'
  // FE_URL: 'https://surmon.me',
  // STATIC_URL: 'https://static.surmon.me'
}

export const AUTH = {
  expiresIn: argv.auth_expires_in || 3600,
  data: argv.auth_data || { user: 'root' },
  defaultPassword: argv.auth_default_password || 'root'
}

export const EMAIL = {
  port: 587,
  host: argv.email_host || 'your email host, e.g. smtp.qq.com',
  account: argv.email_account || 'your email address, e.g. admin@example.me',
  password: argv.email_password || 'your email password',
  from: `"${APP.FE_NAME}" <${argv.email_from || argv.email_account}>`
}
