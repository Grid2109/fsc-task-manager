import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import { v4 } from 'uuid'

import { Button } from './Button'
import { Input } from './Input'
import { TimeSelect } from './TimeSelect'

export const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [time, setTime] = useState('morning')

  const nodeRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      setTitle('')
      setDescription('')
      setTime('morning')
    }
  }, [isOpen])

  const handleSaveClick = () => {
    if (!title || !description || !time) {
      return alert('Preencha todos os campos')
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
              <h2 className='text-xl font-semibold text-[#35383E]'>
                Nova tarefa
              </h2>
              <p className='mt-1 text-sm text-[#9A9C9F]'>
                Insira as informações abaixo
              </p>
              <div className='flex w-[336px] flex-col space-y-4'>
                <Input
                  id='title'
                  label='Título'
                  placeholder='título da tarefa'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
                <Input
                  id='description'
                  label='Descrição'
                  placeholder='Descreva a tarefa'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className='flex gap-3'>
                  <Button
                    size='large'
                    variant='secondary'
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
