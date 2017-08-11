import React from 'react'
import { withInfo } from '@storybook/addon-info'
import Dropzone from 'react-dropzone'
import cn from 'classnames'
import autobind from 'autobind-decorator'
import Promise from 'es6-promise'
import _ from 'lodash'
import Portal from './_portal'
import AsyncButton from '../button/AsyncButton'
import ModalCropper from './avatar-cropper/modal-cropper'
import { isDataURL } from './avatar-cropper/utils'

@autobind
export default class AvatarUploader extends React.Component {

  constructor() {
    super()
    this.state = {
      promiseCallbacks: null,
    }
  }

  onDrop(files) {
    if (isDataURL(files)) {
      this.displayPreview(files)
        .then(this.props.onCrop, this.handleClose)
    } else {
      const reader = new FileReader()
      reader.onload = () => {
        this.displayPreview(reader.result, files[0].type)
          .then(this.props.onCrop, this.handleClose)
      }
      if(_.isObject(files[0])) reader.readAsDataURL(files[0])
    }
  }

  handleDropping(e) {
    e.stopPropagation()
    e.preventDefault()
    if (e.target.nodeName.toLowerCase() === 'img' && this.props.croppedImage) {
      this.onDrop(this.props.croppedImage)
    } else {
      this.dropzone.open()
    }
  }

  displayPreview(dataUrl, type) {
    return new Promise((resolve, reject) => {
      this.setState({
        promiseCallbacks: {
          type: type || 'image/jpeg',
          dataUrl,
          resolve,
          reject,
        },
      }, this.props.onToggle)
    })
  }

  addListener() {
    window.addEventListener('keydown', this.handleKeyDown)
  }

  handleKeyDown(event) {
    if (event.key === 'Escape') {
      this.handleClose()
    }
  }

  handleClose(options) {
    this.props.onToggle(options)
    this.setState({ promiseCallbacks: null })
  }

  handleBackdropClick(event) {
    this.handleClose()
    event.stopPropagation()
    event.preventDefault()
  }

  render() {
    const dropzoneStyles = {
      width: 'inherit',
      height: 'inherit',
      border: 0,
    }

    const { defaultImage, isToggled, className, croppedImage, width, height } = this.props


    return (
      <div className={cn('avatar-uploader', className)}>
        <Dropzone ref={d => { this.dropzone = d }} onDrop={this.onDrop} style={dropzoneStyles} accept="image/*">
          <img onClick={this.handleDropping} width={width} height={height} src={croppedImage || defaultImage} alt="Choose a sthg for your avatar" />
        </Dropzone>
        <div style={{ paddingTop: 20 }}>
          <AsyncButton type="button" className="btn btn-secondary btn-sm" onClick={this.handleDropping} title="Add a profile picture" />
        </div>
        <Portal
          isOpen={isToggled}
          scrollContainer={window.document.body}
          onOpen={this.addListener}
          className="portal"
        >
          <div className="overlay" onClick={this.handleClose} >
            <ModalCropper
              croppedImage={croppedImage}
              cancelButtonCopy="clear the damn thing"
              cropButtonCopy="crop it !"
              width={width}
              onClose={this.props.onToggle}
              height={height}
              promiseCallbacks={this.state.promiseCallbacks}
            />
          </div>
        </Portal>
      </div>
    )
  }
}
