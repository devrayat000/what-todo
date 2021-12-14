import { SessionRequest } from 'supertokens-node/framework/express'
import supertokens from 'supertokens-node'

import { authHandler } from '../../../../utils/connect'
import { getKnex } from '../../../../utils/knex'
import { backendConfig } from '../../../../config/backendConfig'

supertokens.init(backendConfig())

export default authHandler.get<SessionRequest>(async (req, res) => {
  const knex = getKnex()
  if (!req.query.id) {
    return
  }
  const userId = req.session?.getUserId()!

  const todoPromise = knex('todos').where({
    _id: req.query.id as string,
    user_id: userId,
  })

  const todo = await todoPromise
  console.log(`GET /api/todo/${req.query.id}`, todo)
  res.status(200).json({
    todo: { ...todo[0], createdAt: todo[0].created_at },
  })
})
