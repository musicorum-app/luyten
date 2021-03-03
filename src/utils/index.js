import {
  readFileSync
} from 'fs'
import YAML from 'yaml'
import * as path from 'path'
import * as crypto from 'crypto'
import * as fs from 'fs'

export function handleURL (url) {
  return url.endsWith('/') ? url : url + '/'
}

export function loadConfiguration () {
  const file = readFileSync(path.resolve(__dirname, '..', '..', 'config.yaml'), 'utf8')
  return YAML.parse(file)
}

export function hash (str) {
  return crypto.createHash('sha1')
    .update(str)
    .digest('hex')
    .toLowerCase()
}

export function existsAsync (path) {
  return new Promise(resolve => {
    fs.stat(path, err => {
      if (err) resolve(false)
      else resolve(true)
    })
  })
}
