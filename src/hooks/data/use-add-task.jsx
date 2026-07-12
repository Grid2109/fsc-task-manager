import { useMutation, useQueryClient } from '@tanstack/react-query'

import { taskMutationKeys } from '../../keys/mutations'
import { api } from '../../lib/axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: taskMutationKeys.add(),
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
