import { GraphQLScalarType, Kind } from 'graphql'
import type { Todo } from 'knex/types/tables'
import type { IResolvers } from 'mercurius'

import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  toggleDone,
  updateTodo,
} from '$graphql/services'

enum Code {
  TODO_ADDED = 'todo_added',
  TODO_UPDATED = 'todo_updated',
  TODO_DELETED = 'todo_deleted',
}

const resolvers: IResolvers = {
  Query: {
    // All todos
    todos: (parent, args, { knex }) => getTodos(knex),
    // T0d0 By id
    todo: (parent, { id }, { knex }) => getTodoById(knex, id),
  },
  Mutation: {
    async createTodo(parent, { todo, description }, { knex, pubsub }) {
      const newTodo = await createTodo(knex, todo, description)

      pubsub.publish({
        topic: Code.TODO_ADDED,
        payload: { todoAdded: newTodo },
      })

      return newTodo
    },
    async updateTodo(parent, { id, todo, description }, { knex, pubsub }) {
      const updatedTodo = await updateTodo(knex, id, todo, description)

      pubsub.publish({
        topic: Code.TODO_UPDATED,
        payload: {
          todoUpdated: updatedTodo,
        },
      })

      return updatedTodo
    },
    async deleteTodo(parent, { id }, { knex, pubsub }) {
      const deletedTodo = await deleteTodo(knex, id)

      pubsub.publish({
        topic: Code.TODO_DELETED,
        payload: {
          todoDeleted: deletedTodo,
        },
      })

      return deletedTodo
    },
    async toggleDone(parent, { id }, { pubsub, knex }) {
      return await toggleDone(knex, id)
    },
  },
  Subscription: {
    todoAdded: {
      async subscribe(parent, args, { pubsub }) {
        return await pubsub.subscribe<Todo>(Code.TODO_ADDED)
      },
    },
    todoUpdated: {
      async subscribe(parent, args, { pubsub }) {
        return await pubsub.subscribe<Todo>(Code.TODO_UPDATED)
      },
    },
    todoDeleted: {
      async subscribe(parent, args, { pubsub }) {
        return await pubsub.subscribe<Todo>(Code.TODO_DELETED)
      },
    },
  },
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date scalar time',
    serialize(output) {
      if (!(output instanceof Date)) {
        throw new TypeError('type is not date')
      }
      return output.toISOString()
    },
    parseValue(input) {
      if (typeof input !== 'string') {
        throw new TypeError('type is not string')
      }
      return new Date(input)
    },
    parseLiteral(node) {
      if (node.kind !== Kind.STRING) {
        throw new TypeError('type is not string')
      }
      return new Date(node.value)
    },
  }),
}

export default resolvers
