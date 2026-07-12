import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { tv } from 'tailwind-variants'

export const SidebarButton = ({ children, to }) => {
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
    <NavLink
      to={to}
      className={({ isActive }) =>
        sidebar({ color: isActive ? 'selected' : 'unselected' })
      }
    >
      {children}
    </NavLink>
  )
}

SidebarButton.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['selected', 'unselected']),
}
