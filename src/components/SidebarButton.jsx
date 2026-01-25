import PropTypes from 'prop-types'
import { tv } from 'tailwind-variants'

export const SidebarButton = ({ children, color }) => {
  const sidebar = tv({
    base: 'roundend-lg flex items-center gap-2 px-6 py-3',
    variants: {
      color: {
        unselected: 'text-brand-dark-blue',
        selected: 'bg-brand-primary bg-opacity-15 text-brand-primary',
      },
    },
  })

  return (
    <a href='#' className={sidebar({ color })}>
      {children}
    </a>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'unselected']),
}
