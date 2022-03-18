import { nanoid } from 'nanoid'

import { Todo as ITodo } from '../../graphql/generated'

export default class Todo implements ITodo {
  _id: string
  done: boolean
  createdAt: string
  constructor(public todo: string, public description: string) {
    this._id = nanoid(7)
    this.createdAt = new Date().toISOString()
    this.done = false
  }
}
