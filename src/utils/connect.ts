import { NextApiRequest, NextApiResponse } from 'next'
import nc from 'next-connect'
import { StructError } from 'superstruct'
import { SessionRequest } from 'supertokens-node/framework/express'
import { superTokensNextWrapper } from 'supertokens-node/nextjs'
import { verifySession } from 'supertokens-node/recipe/session/framework/express'

const handler = nc<NextApiRequest, NextApiResponse>({
  onError: (err, req, res, next) => {
    console.error(err)
    if (err instanceof StructError) {
      res.status(500).json({
        errors: err.failures().map(f => ({
          message: f.message,
        })),
      })
      return
    }
    res.status(500).json({ error: err.message })
  },
  onNoMatch: (req, res, next) => {
    res.status(404).end('Page is not found')
  },
})

export const authHandler = handler.use<SessionRequest>(
  async (req, res, next) => {
    await superTokensNextWrapper(
      verifySession().bind(null, req as any, res as any),
      req,
      res
    )

    next()
  }
)

export default handler
