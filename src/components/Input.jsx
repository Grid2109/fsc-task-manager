import { forwardRef } from 'react'

import { InputErrorMessage } from './inputErrorMessage'
import { InputLabel } from './InputLabel'

export const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className='flex flex-col space-y-1 text-left'>
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className='rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-[#00ADB5] placeholder:text-sm placeholder:text-[#9A9C9F]'
        {...rest}
        ref={ref}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = 'Input'
