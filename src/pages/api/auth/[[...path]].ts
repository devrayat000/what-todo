import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { middleware } from 'supertokens-node/framework/express'
import supertokens from 'supertokens-node'
import NextCors from 'nextjs-cors'

import { backendConfig } from '../../../config/backendConfig'

supertokens.init(backendConfig())

export default async function superTokens(req: any, res: any) {
  try {
    await NextCors(req, res, {
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
      origin: 'http://localhost:3000',
      credentials: true,
      allowedHeaders: ['content-type', ...supertokens.getAllCORSHeaders()],
    })

    // next()
    await superTokensNextWrapper(
      middleware().bind(null, req as any, res as any),
      req,
      res
    )
    if (!res.writableEnded) {
      res.status(404).send('Not found')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
  // next()
}
