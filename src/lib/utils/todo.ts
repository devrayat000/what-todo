import { nanoid } from 'nanoid'

export default class Todo {
  _id: string
  createdAt: string
  constructor(todo: string, description: string)
  constructor(todo: string, description: string, done: boolean)
  constructor(
    public todo: string,
    public description: string,
    public done = false
  ) {
    this._id = nanoid(7)
    this.createdAt = new Date().toISOString()
  }
}
