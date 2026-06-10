import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['updateTask', taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: data.title.trim(),
          time: data.time,
          description: data.description.trim(),
        }),
      })
      if (!response.ok) {
        throw new Error()
      }
      const updateTask = await response.json()
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
