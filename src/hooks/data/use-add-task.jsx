import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: 'addTask',
    mutationFn: async (task) => {
      const { data: createTask } = await axios.post(
        'http://localhost:3000/tasks',
        task
      )
      return createTask
    },
    onSuccess: (createTask) => {
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return [...oldTasks, createTask]
      })
    },
  })
}
