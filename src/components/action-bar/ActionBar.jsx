import React from 'react'
import cn from 'classnames'
import PropTypes from 'prop-types'

const ActionBar = ({ actions, schema }) => (
  <ul className="action-bar">
    {actions.map(action =>
      <li
        key={action.key}
        className={cn({ hidden: action.visibility }, 'action', action.key)}
      >
        <span className="tooltipped tooltipped-n" aria-label={action.tooltipContent}>
          <button className="btn" value={action.key} onClick={action.handle.bind(schema || null)} aria-hidden="true"><i className={action.icon} value={action.key} /></button>
        </span>
      </li>,
    )}
  </ul>
)

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string,
    handle: PropTypes.func,
    tooltipContent: PropTypes.string,
    visibility: PropTypes.bool,
  })).isRequired,
}

export default ActionBar
