import PropTypes from 'prop-types'
import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import { LoaderIcon } from '../assets/icons'
import { Button } from './Button'
import { Input } from './Input'
import { TimeSelect } from './TimeSelect'

export const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSucess,
  onSubmitError,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: '',
      time: 'morning',
      description: '',
    },
  })

  const nodeRef = useRef(null)

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: 'not_started',
    }

    const response = await fetch('http://localhost:3000/tasks', {
      method: 'POST',
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return onSubmitError()
    }

    onSubmitSucess(task)
    reset({
      title: '',
      time: '',
      description: '',
    })
    handleClose()
  }

  const handleCancelClick = () => {
    reset({
      title: '',
      time: 'morning',
      description: '',
    })
    handleClose()
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames='add-task-dialog'
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className='fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-md'
          >
            <div className='rounded-xl bg-white p-5 text-center shadow'>
              <h2 className='text-xl font-semibold text-brand-dark-blue'>
                Nova tarefa
              </h2>
              <p className='mt-1 text-sm text-brand-text-gray'>
                Insira as informações abaixo
              </p>

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className='flex w-[336px] flex-col space-y-4'
              >
                <Input
                  id='title'
                  label='Título'
                  placeholder='título da tarefa'
                  errorMessage={errors?.title?.message}
                  disabled={isSubmitting}
                  {...register('title', {
                    required: 'O título é obrigatório.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'O título não pode ser vazio.'
                      }
                    },
                  })}
                />

                <TimeSelect
                  errorMessage={errors?.time?.message}
                  disabled={isSubmitting}
                  {...register('time', {
                    required: 'O horário é obrigatório',
                  })}
                />
                <Input
                  id='description'
                  label='Descrição'
                  placeholder='Descreva a tarefa'
                  errorMessage={errors?.description?.message}
                  disabled={isSubmitting}
                  {...register('description', {
                    required: 'A descrição é obrigatória.',
                    validate: (value) => {
                      if (!value.trim()) {
                        return 'A descrição não pode ser vazia.'
                      }
                    },
                  })}
                />
                <div className='flex gap-3'>
                  <Button
                    size='large'
                    color='secondary'
                    className='w-full'
                    onClick={handleCancelClick}
                    type='button'
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveClick}
                    size='large'
                    className='w-full'
                    disabled={isSubmitting}
                    type='submit'
                  >
                    {isSubmitting && <LoaderIcon className='animate-spin' />}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.prototype = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSucess: PropTypes.func.isRequired,
}
