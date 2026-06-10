import { useMutation, useQueryClient } from '@tanstack/react-query'

import { api } from '../../lib/axios'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const { data: deleteTask } = await api.delete(`/tasks/${taskId}`)
      return deleteTask
    },
    onSuccess: (deleteTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        if (!oldTasks) return oldTasks
        return oldTasks.filter((oldTask) => oldTask.id !== deleteTask.id)
      })
      queryClient.removeQueries({ queryKey: ['task', taskId] })
    },
  })
}
