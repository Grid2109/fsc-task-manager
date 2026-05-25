import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'sonner'

import {
  AddIcon,
  CloudIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from '../assets/icons'
import { AddTaskDialog } from './AddTaskDialog'
import { Button } from './Button'
import { TaskItem } from './TaskItem'
import { TasksSeparator } from './TasksSeparator'

export function Tasks() {
  const queryClient = useQueryClient()
  const { data: tasks } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'GET',
      })
      return response.json()
    },
  })

  const [addTaskDialogIsOpen, setAddTaskDialogIsOpen] = useState(false)

  const morningTasks = tasks?.filter((task) => task.time === 'morning')
  const afternoonTasks = tasks?.filter((task) => task.time === 'afternoon')
  const eveningTasks = tasks?.filter((task) => task.time === 'evening')

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id != taskId) {
        return task
      }

      if (task.status === 'not_started') {
        toast.success('Tarefa iniciada com sucesso')
        return { ...task, status: 'in_progress' }
      }

      if (task.status === 'in_progress') {
        toast.success('Tarefa concluída com sucesso')
        return { ...task, status: 'done' }
      }
      if (task.status === 'done') {
        toast.success('Tarefa reiniciada com sucesso')
        return { ...task, status: 'not_started' }
      }

      return task
    })

    queryClient.setQueryData(['tasks'], newTasks)
  }

  return (
    <div className='w-full space-y-6 px-8 py-16'>
      <div className='flex w-full justify-between'>
        <div>
          <span className='text-xs font-semibold text-brand-primary'>
            Minhas tarefas
          </span>
          <h2 className='text-xl font-semibold'>Minhas tarefas</h2>
        </div>

        <div className='flex items-center gap-3'>
          <Button color='ghost'>
            Limpar tarefas
            <TrashIcon />
          </Button>
          <Button color='primary' onClick={() => setAddTaskDialogIsOpen(true)}>
            Nova tarefa
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogIsOpen}
            handleClose={() => setAddTaskDialogIsOpen(false)}
          />
        </div>
      </div>
      <div className='rounded-xl bg-white p-6'>
        <div className='space-y-3'>
          <TasksSeparator icon={<SunIcon />} title='Manhã' />
          {morningTasks?.length === 0 && (
            <div className='text-brand-text-gray'>
              <p>Nenhuma tarefa cadastrada no período da manhã.</p>
            </div>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className='my-6 space-y-3'>
          <TasksSeparator icon={<CloudIcon />} title='Tarde' />
          {afternoonTasks?.length === 0 && (
            <div className='text-brand-text-gray'>
              <p>Nenhuma tarefa cadastrada no período da tarde.</p>
            </div>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
        <div className='space-y-3'>
          <TasksSeparator icon={<MoonIcon />} title='Noite' />
          {eveningTasks?.length === 0 && (
            <div className='text-brand-text-gray'>
              <p>Nenhuma tarefa cadastrada no período da noite.</p>
            </div>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
