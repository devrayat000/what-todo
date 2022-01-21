import fp from 'fastify-plugin'
import mercurius, { type MercuriusOptions } from 'mercurius'
import altair from 'altair-fastify-plugin'
import type { Knex } from 'knex'

import getSchema from '../utils/schema'

export default fp<MercuriusOptions>(async (fastify, opts) => {
  const schema = await getSchema(fastify)

  fastify.register(mercurius, {
    graphiql: false,
    ide: false,
    schema,
    // resolvers,
    async context(request, reply) {
      return {
        knex: fastify.knex,
      }
    },
    subscription: true,
  })

  fastify.register(altair)
})

declare module 'mercurius' {
  interface MercuriusContext {
    knex: Knex
  }
}
