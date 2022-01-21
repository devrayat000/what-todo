import fp from 'fastify-plugin'
import knex, { Knex } from 'knex'
import logger from 'knex-tiny-logger'

import knexConfig from '../../knexfile'

export default fp<Knex.Config>(async (fastify, opts) => {
  const database = knex({
    ...knexConfig[process.env.NODE_ENV ?? 'development'],
    ...opts,
  })

  database.on('query', query => {
    console.warn(query.sql, query.bindings)
  })

  //   database
  //     .select('*')
  //     .from('todo')
  //     .stream()
  //     .on('query', (q: any) => {
  //       console.log(q)
  //     })

  fastify.decorate('knex', database)
})

declare module 'fastify' {
  interface FastifyInstance {
    knex: Knex
  }
}
