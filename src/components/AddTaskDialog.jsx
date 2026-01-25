import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import { Button } from './Button'
import { Input } from './Input'
import { TimeSelect } from './TimeSelect'

export const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([])

  const nodeRef = useRef(null)
  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleSaveClick = () => {
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
      return
    }

    handleSubmit({
      id: v4(),
      title,
      description,
      time,
      status: 'not_started',
    })

    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === 'title')
  const descriptionError = errors.find(
    (error) => error.inputName === 'description'
  )
  const timeError = errors.find((error) => error.inputName === 'time')

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
              <div className='flex w-[336px] flex-col space-y-4'>
                <Input
                  id='title'
                  label='Título'
                  placeholder='título da tarefa'
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />

                <TimeSelect errorMessage={timeError?.message} ref={timeRef} />
                <Input
                  id='description'
                  label='Descrição'
                  placeholder='Descreva a tarefa'
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                />
                <div className='flex gap-3'>
                  <Button
                    size='large'
                    color='secondary'
                    className='w-full'
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSaveClick}
                    size='large'
                    className='w-full'
                  >
                    Salvar
                  </Button>
                </div>
              </div>
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
  handleSubmit: PropTypes.func.isRequired,
}
