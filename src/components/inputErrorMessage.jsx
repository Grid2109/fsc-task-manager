import PropTypes from 'prop-types'

export const InputErrorMessage = ({ children }) => {
  return <p className='text-left text-sm text-red-500'>{children}</p>
}

InputErrorMessage.propTypes = {
  children: PropTypes.node.isRequired,
}
