import React from 'react'
import { withInfo } from '@storybook/addon-info'
import PropTypes from 'prop-types'

const Bell = ({ onClick, size }) => {
  return (
    <button type="button" className="dropdown_toggle" onClick={onClick}>
      <div className="dropdown_icon">
        <svg key="bell" className="bell" width="100%" height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"
          />
        </svg>
        {/* {
          ui.hasNewNotifications ?
            <svg key="badge" className="badge" width="18px" height="18px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <circle cx="10" cy="10" r="10" />
            </svg>
          : null
        } */}
      </div>
    </button>
  )
}

Bell.defaultProps = {
  size: 40,
}

Bell.propTypes = {
  onClick: PropTypes.func.isRequired,
  size: PropTypes.number,
}

export default Bell
