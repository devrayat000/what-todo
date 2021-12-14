// Update with your config settings.

import type { Knex } from 'knex'
// import convertToCamelCase from 'lodash/camelCase'

export default {
  client: 'pg',
  connection: process.env.NEXT_PUBLIC_DB_CONN_STRING,

  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
} as Knex.Config
