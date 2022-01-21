import type { Knex } from 'knex'

// Update with your config settings.

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: 'better-sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      tableName: 'todo_migrations',
      directory: './data/migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './data/seeds',
      extension: 'ts',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'todo_migrations',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'todo_migrations',
    },
  },
}

export default knexConfig
