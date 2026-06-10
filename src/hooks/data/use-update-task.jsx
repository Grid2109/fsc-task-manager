import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../lib/axios'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (data) => {
      const { data: updateTask } = await api.patch(`/tasks/${taskId}`, {
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      })
      return updateTask
    },
    onSuccess: (updateTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        if (!oldTasks) return oldTasks
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask
          }
          return oldTask
        })
      })
      queryClient.setQueryData(['task', taskId], updateTask)
    },
  })
}
