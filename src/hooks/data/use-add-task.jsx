import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../lib/axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (task) => {
      const { data: createTask } = await api.post('/tasks', task)
      return createTask
    },
    onSuccess: (createTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return [...oldTasks, createTask]
      })
    },
  })
}
