import { SessionRequest } from 'supertokens-node/framework/express'
import supertokens from 'supertokens-node'

import { authHandler } from '../../../../utils/connect'
import { getKnex } from '../../../../utils/knex'
import { backendConfig } from '../../../../config/backendConfig'

supertokens.init(backendConfig())

export default authHandler.patch<SessionRequest>(async (req, res) => {
  console.log('post /api/todo/[id]/done')

  const userId = req.session?.getUserId()!
  const knex = getKnex()

  const todo = await knex
    .table('todos')
    .update({
      done: knex.raw<boolean>(
        `NOT (SELECT done FROM todos WHERE _id = ?)`,
        req.query.id as string
      ),
    })
    .where({
      _id: req.query.id as string,
      user_id: userId,
    })
    .returning('*')

  res.status(200).json({
    todo: { ...todo[0], createdAt: todo[0].created_at },
  })
})
