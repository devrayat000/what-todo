import { nanoid } from 'nanoid'

import { ITodo } from '../interfaces'

export default class Todo implements ITodo {
  _id: string
  done: boolean
  createdAt: Date
  constructor(public note: string, public user_id: string) {
    this._id = nanoid(7)
    this.createdAt = new Date()
    this.done = false
  }
}
