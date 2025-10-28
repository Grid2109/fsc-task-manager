import { createPortal } from 'react-dom'

import { Button } from './Button'
import { Input } from './Input'
export const AddTaskDialog = ({ isOpen, handleClose }) => {
  if (!isOpen) return null
  return createPortal(
    <div className='fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-md'>
      <div className='rounded-xl bg-white p-5 text-center shadow'>
        <h2 className='text-xl font-semibold text-[#35383E]'>Nova tarefa</h2>
        <p className='mt-1 text-sm text-[#9A9C9F]'>
          Insira as informações abaixo
        </p>
        <div className='flex w-[336px] flex-col space-y-4'>
          <Input id='title' label='Título' placeholder='título da tarefa' />
          <Input id='time' label='Horário' placeholder='horário' />
          <Input
            id='description'
            label='Descrição'
            placeholder='Descreva a tarefa'
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
            <Button size='large' className='w-full'>
              Salvar
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
