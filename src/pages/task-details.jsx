import { useEffect, useState } from 'react'
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
  const [task, setTask] = useState()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleBackClick = () => {
    navigate(-1)
  }

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'GET',
      })
      const data = await response.json()
      setTask(data)
      reset(data)
    }

    fetchTasks()
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: data.title.trim(),
        time: data.time,
        description: data.description.trim(),
      }),
    })
    if (!response.ok) {
      toast.error('Erro ao atualizar a tarefa. Por favor, tente novamente.')
    }

    const newTask = await response.json()
    setTask(newTask)
    toast.success('Tarefa atualizada com sucesso!')
  }

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      return toast.error('Ocorreu um erro ao deletar a tarefa.')
    }
    toast.success('Tarefa deletada com sucesso!')
    navigate(-1)
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
              onClick={handleSaveClick}
              disabled={isSubmitting}
              type='submit'
            >
              {isSubmitting && <LoaderIcon className='animate-spin' />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
