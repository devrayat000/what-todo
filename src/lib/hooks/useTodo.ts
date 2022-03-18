import { useCallback } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { ITodo } from '../interfaces'
import { api } from '../lib/utils/axios'

function todoUpdater(id: string) {
  console.log('updating')

  return api
    .patch<{ todo: ITodo }>(`/api/todo/${id}/done`)
    .then(r => r.data.todo)
}

function todoFetcher(id: string): Promise<ITodo>

function todoFetcher(id: string) {
  return api.get<{ todo: ITodo }>(`/api/todo/${id}`).then(r => r.data.todo)
}

export default function useTodo(initialData: ITodo) {
  const queryClient = useQueryClient()

  const { data, ...query } = useQuery(
    ['/api/todo/[id]', initialData._id],
    context => {
      return todoFetcher(context.queryKey[1])
    },
    {
      initialData: initialData,
      isDataEqual: (oldData, newData) =>
        oldData?._id === newData._id &&
        oldData.note === newData.note &&
        oldData.done === newData.done,
    }
  )

  const { mutate } = useMutation<
    ITodo,
    Error,
    string,
    { previousTodo?: ITodo; _id: string }
  >(todoUpdater, {
    onMutate: async () => {
      await queryClient.cancelQueries(['/api/todo/[id]', initialData._id])

      const previousTodo = queryClient.getQueryData<ITodo>([
        '/api/todo/[id]',
        initialData._id,
      ])

      queryClient.setQueryData<ITodo>(
        ['/api/todo/[id]', initialData._id],
        prev => ({
          ...prev!,
          done: !prev?.done,
        })
      )

      return { previousTodo, _id: initialData._id }
    },
    onError: (err, _id, context) => {
      queryClient.setQueryData(['todos', _id], context?.previousTodo)
    },
    onSettled: todo => {
      queryClient.invalidateQueries(['/api/todo/[id]', todo?._id])
    },
  })

  return {
    ...query,
    todo: data ?? initialData,
    done: useCallback(() => {
      return mutate(initialData._id)
    }, [mutate, initialData._id]),
  }
}
