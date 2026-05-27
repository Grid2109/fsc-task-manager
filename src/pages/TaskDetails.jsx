import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from '../assets/icons'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { Sidebar } from '../components/Sidebar'
import { TimeSelect } from '../components/TimeSelect'

export const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const queryClient = useQueryClient()
  const { mutate: deleteTask, isPending: deleteTaskIsLoading } = useMutation({
    mutationKey: ['deleteTask', taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
      })
      if (!response.ok) {
        throw new Error()
      }
      const deleteTask = await response.json()
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.filter((oldTask) => oldTask.id != deleteTask.id)
      })
    },
  })

  const { mutate: updateTask, isPending: updateTaskIsLoading } = useMutation({
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
      queryClient.setQueryData(['tasks'], (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updateTask
          }
          return oldTask
        })
      })
    },
  })

  const { data: task } = useQuery({
    queryKey: ['task', taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error('Erro ao buscar tarefa')
      }
      const taskData = await response.json()
      reset(taskData)
      return taskData
    },
  })

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleSaveClick = async (data) => {
    updateTask(data, {
      onSuccess: () => toast.success('Tarefa atualizada com sucesso!'),
      onError: () =>
        toast.error('Erro ao adicionar tarefa. Por favor, tente novamente.'),
    })
  }

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
        navigate(-1)
      },
      onError: () => toast.error('Ocorreu um erro ao deletar a tarefa.'),
    })
  }

  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full space-y-6 px-8 py-16'>
        <div className='flex w-full justify-between'>
          <div>
            <button
              onClick={handleBackClick}
              className='mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary'
            >
              <ArrowLeftIcon />
            </button>

            <div className='flex items-center gap-1 text-xs'>
              <Link to='/' className='text-brand-text-gray'>
                Minhas tarefas
              </Link>
              <ChevronRightIcon className='text-brand-text-gray' />
              <span className='font-semibold text-brand-primary'>
                {task?.title}
              </span>
            </div>

            <h1 className='mt-2 text-xl font-semibold'>{task?.title}</h1>
          </div>

          <Button
            className='h-fit self-end'
            color='danger'
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar Tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className='space-y-6 rounded-xl bg-brand-white p-6'>
            <div>
              <Input
                id='title'
                label='Título'
                {...register('title', {
                  required: 'O título é obrigatório.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'O título não pode ser vazio.'
                    }
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>
            <div>
              <TimeSelect
                {...register('time', { required: 'O horário é obrigatório' })}
                errorMessage={errors?.time?.message}
              />
            </div>
            <div>
              <Input
                id='description'
                label='Descrição'
                {...register('description', {
                  required: 'A descrição é obrigatória.',
                  validate: (value) => {
                    if (!value.trim()) {
                      return 'A descrição não pode ser vazia.'
                    }
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>

          <div className='flex w-full justify-end gap-3'>
            <Button
              size='large'
              color='primary'
              disabled={updateTaskIsLoading || deleteTaskIsLoading}
              type='submit'
            >
              {(updateTaskIsLoading || deleteTaskIsLoading) && (
                <LoaderIcon className='animate-spin' />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
