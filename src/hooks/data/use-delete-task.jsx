import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleTask = (taskId) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      const deleteTask = await response.json()
      return deleteTask
    },
    onSuccess: (deleteTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id != deleteTask.id)
      })
    },
  })
}
