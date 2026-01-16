export const InputLabel = (props) => {
  return (
    <label {...props} className='text-brand-dark-blue text-sm font-semibold'>
      {props.children}
    </label>
  )
}
