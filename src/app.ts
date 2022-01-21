import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import { FastifyPluginAsync } from 'fastify'

import knexPlugin from '$plugins/knex'
import mercuriusPlugin from '$plugins/mercurius'
import socketPlugin from '$plugins/socket'
import sensiblePlugin from '$plugins/sensible'

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  if (process.env.NODE_ENV !== 'production') {
    void fastify.register(AutoLoad, {
      dir: join(__dirname, 'plugins'),
      options: opts,
    })
    void fastify.register(AutoLoad, {
      dir: join(__dirname, 'routes'),
      options: opts,
    })
  } else {
    void fastify
      .register(knexPlugin)
      .register(mercuriusPlugin)
      .register(socketPlugin)
      .register(sensiblePlugin)
  }
}

export default app
export { app }
