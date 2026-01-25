import PropTypes from 'prop-types'

export function Header(props) {
  return <header>{props.children}</header>
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
}
