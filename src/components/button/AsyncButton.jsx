import React from 'react'
import _ from 'lodash'
import cn from 'classnames'
import PropTypes from 'prop-types'
import { CssSpinner as Spinner } from '../spinner/Css'

export default class AsyncButton extends React.PureComponent {
  static defaultProps = {
    disabled: false,
    kind: 'primary',
    align: 'left',
    width: 100,
    className: '',
    icon: 'fa fa-home',
    title: 'I am a button',
  }

  static propTypes = {
    onClick: PropTypes.func.isRequired,
    kind: PropTypes.string,
    align: PropTypes.string,
    title: PropTypes.string,
    className: PropTypes.string,
    width: PropTypes.number,
    disabled: PropTypes.bool,
    icon: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.string,
    ]),
  }

  constructor() {
    super()
    this.state = {
      spinning: false,
      success: false,
    }
  }

  isSending(bool) {
    this.setState({ spinning: bool })
  }

  success() {
    this.setState({ success: true })
    _.delay(() => {
      this.setState({ success: false })
    }, 700)
  }

  render() {
    const btnClass = cn('async-btn', {
      [`pull-${this.props.align}`]: this.props.align,
      [`async-btn--${this.props.kind}`]: this.props.kind,
      spinning: this.state.spinning,
    }, this.props.className)

    const buttonSuccess = (<div style={{ minWidth: this.props.width }} className={`success-btn ${btnClass}`}>
      <div className="fill" />
      <div className="success-btn-label">Success</div>
    </div>)

    const buttonActive = (
      <button style={{ minWidth: this.props.width }} className={btnClass} type="submit" disabled={this.props.disabled} onClick={this.props.onClick}>
        { this.state.spinning ? <Spinner type="rays" /> : null }
        { typeof this.props.icon === 'object' ? <i style={{ width: 40 }}>{this.props.icon}</i> : <i className={this.props.icon} /> }
        <span>{this.props.title}</span>
      </button>
    )
    return this.state.success ? buttonSuccess : buttonActive
  }
}
