import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error()
      }
      const deleteTask = await response.json()
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
