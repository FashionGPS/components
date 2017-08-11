import PropTypes from 'prop-types'
import React from 'react'
import { withInfo } from '@storybook/addon-info'
import _ from 'lodash'
import Cropper from './avatar-cropper'

export default React.createClass({
  propTypes: {
    file: PropTypes.object.isRequired,
    image: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    closeButtonCopy: PropTypes.string,
    cropButtonCopy: PropTypes.string,
  },
  getDefaultProps() {
    return {
      width: 400,
      height: 400,
      style: {},
      closeButtonCopy: 'Close',
      cropButtonCopy: 'Crop and Save',
    }
  },

  onCancel() {
    if (this.props.promiseCallbacks) this.props.promiseCallbacks.reject({ reset: true })
  },

  onCrop(dataUrl) {
    if (this.props.promiseCallbacks) {
      // https://github.com/ebidel/filer.js/blob/master/src/filer.js#L137
      // const blob = this.dataURLToBlob(dataUrl) // upload new file to server ?
      this.props.promiseCallbacks.resolve(dataUrl)
      this.props.onClose()
    }
  },

  dataURLToBlob(dataURL) {
    const BASE64_MARKER = 'base64,'
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      const parts = dataURL.split(',')
      const raw = decodeURIComponent(parts[1])
      return new Blob([raw], { type: this.props.promiseCallbacks.type })
    }

    const parts = dataURL.split(BASE64_MARKER)
    const raw = window.atob(parts[1])
    const rawLength = raw.length
    const uInt8Array = new Uint8Array(rawLength)
    _.times(rawLength, i => {
      uInt8Array[i] = raw.charCodeAt(i)
    })
    return new Blob([uInt8Array], { type: this.props.promiseCallbacks.type })
  },


  render() {
    return <Cropper
      image={this.props.promiseCallbacks ? this.props.promiseCallbacks.dataUrl : this.props.croppedImage}
      width={this.props.width}
      height={this.props.height}
      style={this.props.style}
      onCrop={this.onCrop}
      onCancel={this.onCancel}
      cancelButtonCopy={this.props.cancelButtonCopy}
      cropButtonCopy={this.props.cropButtonCopy}
    />
  },
})
