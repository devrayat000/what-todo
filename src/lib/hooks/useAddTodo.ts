import { useMutation, useQueryClient } from 'react-query'
import { getUserId } from 'supertokens-auth-react/recipe/session'

import { ITodo } from '../interfaces'
import { api } from '../lib/utils/axios'
import Todo from '../utils/todo'

function todoAdder(newTodoNote: string) {
  return api
    .post<{ todo: ITodo }>('/api/todo', { note: newTodoNote })
    .then(r => r.data.todo)
}

export default function useAddTodo() {
  const queryClient = useQueryClient()

  const { mutate, ...mutation } = useMutation<
    ITodo,
    Error,
    string,
    { previousTodos?: ITodo[] }
  >(todoAdder, {
    onMutate: async newNote => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries('/api/todo')

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData<ITodo[]>('/api/todo')

      // Optimistically update to the new value
      const uid = await getUserId()
      queryClient.setQueryData<ITodo[]>('/api/todo', prev => [
        ...prev!,
        new Todo(newNote, uid),
      ])

      // Return a context object with the snapshotted value
      return { previousTodos }
    },
    // If the mutation fails, use the context returned from onMutate to roll back
    onError: (err, newNote, context) => {
      queryClient.setQueryData('/api/todo', context?.previousTodos)
    },
    // Always refetch after error or success:
    onSettled: newTodo => {
      return queryClient.invalidateQueries<ITodo[]>('/api/todo')
    },
  })

  return { ...mutation, add: mutate }
}
