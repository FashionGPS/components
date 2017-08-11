import React from 'react'
import enhanceWithClickOutside from 'react-click-outside'
import cn from 'classnames'
import PropTypes from 'prop-types'

@enhanceWithClickOutside
export default class Dropdown extends React.PureComponent {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
      index: PropTypes.string,
      title: PropTypes.string,
      href: PropTypes.string,
    })).isRequired,
  }

  constructor() {
    super()
    this.state = {
      isOpened: false,
    }
  }

  handleAction() {
    if (this.onClick) this.onClick(this.title)
  }

  handleClickOutside(bool) {
    this.setState({ isOpened: !bool || false })
  }

  render() {
    const classDropdown = cn('dropdown-menu', {
      show: this.state.isOpened,
    })

    return (
      <div className="dropdown">
        <button className="dropdown-label" onClick={() => this.handleClickOutside(this.state.isOpened)} ><i className="fa fa-share" />Share</button>
        <ul className={classDropdown}>
          {this.props.options.map(option =>
            <li key={option.index} onClick={this.handleAction.bind(option)}>
              { option.href ? <a href={option.href} rel="noopener noreferrer" target="_blank">{option.title}</a> : <span>{option.title}</span> }
            </li>,
          )}
        </ul>
      </div>
    )
  }
}
