import { useEffect, useRef, useState } from 'react'
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
  const [errors, setErrors] = useState([])
  const [savingIsLoading, setSavingIsLoading] = useState(false)

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const navigate = useNavigate()

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
    }

    fetchTasks()
  }, [taskId])

  const handleSaveClick = async () => {
    setSavingIsLoading(true)
    const newErrors = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: 'title',
        message: 'O título é obrigatório',
      })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: 'description',
        message: 'A descrição é obrigatória',
      })
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: 'time',
        message: 'O horário é obrigatório',
      })
    }

    setErrors(newErrors)

    if (newErrors.length > 0) {
      return setSavingIsLoading(false)
    }

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: 'PATCH',
      body: JSON.stringify({ title, time, description }),
    })
    if (!response.ok) {
      toast.error('Erro ao atualizar a tarefa. Por favor, tente novamente.')
      return setSavingIsLoading(false)
    }

    const newTask = await response.json()
    setTask(newTask)
    setSavingIsLoading(false)
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

  const titleError = errors.find((error) => error.inputName === 'title')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )
  const timeError = errors.find((error) => error.inputName === 'time')

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

        <div className='space-y-6 rounded-xl bg-brand-white p-6'>
          <div>
            <Input
              id='title'
              label='Título'
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>
          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>
          <div>
            <Input
              id='description'
              label='Descrição'
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>

        <div className='flex w-full justify-end gap-3'>
          <Button
            size='large'
            color='primary'
            onClick={handleSaveClick}
            disabled={savingIsLoading}
          >
            {savingIsLoading && <LoaderIcon className='animate-spin' />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}
