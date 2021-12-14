import knex, { Knex } from 'knex'
import config from '../../knexfile'

/**
 * Global is used here to ensure the connection
 * is cached across hot-reloads in development
 *
 * see https://github.com/vercel/next.js/discussions/12229#discussioncomment-83372
 */
let cached = global.pg
if (!cached) cached = global.pg = {}

export function getKnex() {
  if (!cached.instance) cached.instance = knex(config)
  return cached.instance
}

declare global {
  namespace NodeJS {
    export interface Global {
      pg: {
        instance?: Knex
      }
    }
  }
}
