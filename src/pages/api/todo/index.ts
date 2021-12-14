import { assert, object, string } from 'superstruct'
import type { SessionRequest } from 'supertokens-node/framework/express'
import { backendConfig } from '../../../config/backendConfig'
import supertokens from 'supertokens-node'

import { authHandler } from '../../../utils/connect'
import { getKnex } from '../../../utils/knex'

const createTodoBody = object({
  note: string(),
})

// type CreateBodyType = Infer<typeof createTodoBody>

// import '../../../interfaces/knex.d'
supertokens.init(backendConfig())

export default authHandler
  .get<SessionRequest>(async (req, res) => {
    const userId = req.session?.getUserId()!

    const knex = getKnex()
    const todos = await knex('todos')
      .where('user_id', userId)
      .orderBy('created_at', 'desc')

    res.status(200).json({
      todos: todos.map(({ _id, note, done, created_at }) => ({
        _id,
        note,
        done,
        createdAt: new Date(created_at),
      })),
    })
  })
  .post<SessionRequest>(async (req, res) => {
    assert(req.body, createTodoBody)
    const userId = req.session?.getUserId()!

    const { note } = req.body
    const knex = getKnex()

    const todos = knex('todos').insert({ note, user_id: userId }).returning('*')
    console.log(todos.toSQL().sql)

    res.status(201).json({ todo: (await todos)[0] })
  })
