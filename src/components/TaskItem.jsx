import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

import { CheckIcon, DetailsIcon, LoaderIcon, TrashIcon } from '../assets/icons'
import { useDeleteTask } from '../hooks/data/use-delete-task'
import { useUpdateTask } from '../hooks/data/use-update-task'
import { Button } from './Button'

export const TaskItem = ({ task }) => {
  const { mutate: deleteTask, isPending } = useDeleteTask(task.id)
  const { mutate } = useUpdateTask(task.id)

  const getNewStatus = () => {
    if (task.status === 'not_started') {
      return 'in_progress'
    }
    if (task.status === 'in_progress') {
      return 'done'
    }
    return 'not_started'
  }

  const handleCheckboxClick = () => {
    mutate(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () =>
          toast.success('Status da tarefa atualizado com sucesso!'),
        onError: () =>
          toast.error(
            'Erro ao atualizar status da tarefa. Por favor, tente novamente.'
          ),
      }
    )
  }

  const handleDeleteClick = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success('Tarefa deletada com sucesso!')
      },
      onError: () => {
        toast.error('Erro ao deletar tarefa!')
      },
    })
  }

  const getStatusClasses = () => {
    if (task.status === 'done') {
      return 'bg-brand-primary  text-brand-primary'
    }
    if (task.status === 'in_progress') {
      return 'bg-brand-process   text-brand-process'
    }
    if (task.status === 'not_started') {
      return 'bg-brand-dark-blue bg-opacity-10 text-brand-dark-blue'
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm transition ${getStatusClasses()} bg-opacity-10`}
    >
      <div className='flex items-center gap-2'>
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type='checkbox'
            checked={task.status === 'done'}
            className='absolute h-full w-full cursor-pointer opacity-0'
            onChange={handleCheckboxClick}
          />
          {task.status === 'done' && <CheckIcon />}
          {task.status === 'in_progress' && (
            <LoaderIcon className='h-3 w-3 animate-spin text-white' />
          )}
        </label>
        {task.title}
      </div>

      <div className='flex items-center gap-2'>
        <Button color='ghost' onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <LoaderIcon className='animate-spin text-brand-text-gray' />
          ) : (
            <TrashIcon className='text-brand-text-gray' />
          )}
        </Button>

        <Link to={`/task/${task.id}`}>
          <DetailsIcon className='transition hover:opacity-75' />
        </Link>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(['morning', 'afternoon', 'evening']).isRequired,
    status: PropTypes.oneOf(['not_started', 'in_progress', 'done']).isRequired,
  }).isRequired,
}
