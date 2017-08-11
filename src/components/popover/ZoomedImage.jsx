import React from 'react'
import { withInfo } from '@storybook/addon-info'
import PropTypes from 'prop-types'
import Portal from './_portal'

export default class ZoomedImage extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    onToggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }

  constructor() {
    super()
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.props.onToggle(false)
  }

  addListener() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.handleClose()
    }
  }

  handleBackdropClick = event => {
    this.handleClose()
    event.stopPropagation()
    event.preventDefault()
  }

  renderPortal = () => {
    const { image, isOpen, width, height } = this.props
    const imgLargerThanWindow = window.innerWidth < width
    return (
      <Portal
        isOpen={isOpen}
        scrollContainer={window.document.body}
        onOpen={this.addListener}
        className="portal"
      >
        <div className="overlay" onClick={this.handleBackdropClick} >
          <div className="close-btn" onClick={this.handleClose} />
          <div className="zoom_view_container" style={{ width: '100%', height: '100%', position: 'relative', overflowY: 'auto', overflowX: 'hidden' }}>
            <div className="zoom_image_container" style={{ height: imgLargerThanWindow ? window.innerHeight : height, width, position: 'absolute', marginLeft: imgLargerThanWindow ? 0 : (window.innerWidth - width) / 2 }} >
              <img src={image} alt="" style={{ width: imgLargerThanWindow ? window.innerWidth : '100%' }} />
            </div>
          </div>
        </div>
      </Portal>
    )
  }

  render() {
    const { isOpen, onToggle, image } = this.props
    return isOpen ? this.renderPortal() : <img src={image} alt="Beautiful tournesold field" width={500} height={300} onClick={onToggle} />
  }
}
