import React from 'react'
import autobind from 'autobind-decorator'
import { isDataURL } from './utils.js'
import { AvatarCrop } from '../_draggable'

const defaults = {
  minZoom: 1,
  maxZoom: 4,
}

class Cropper extends React.Component {
  constructor() {
    super()

    this.state = {
      dragging: false,
      preview: null,
      scale: 1,
    }
  }

  fitImageToCanvas(width, height) {
    var scaledHeight, scaledWidth, scaleRatio

    var canvasAspectRatio = this.props.height / this.props.width
    var imageAspectRatio = height / width

    if (canvasAspectRatio > imageAspectRatio) {
      scaledHeight = this.props.height
      scaleRatio = scaledHeight / height
      scaledWidth = width * scaleRatio
    } else {
      scaledWidth = this.props.width
      scaleRatio = scaledWidth / width
      scaledHeight = height * scaleRatio
    }

    return scaleRatio < defaults.minZoom ? defaults.minZoom : scaleRatio > defaults.maxZoom ? defaults.maxZoom : scaleRatio
    // return scaleRatio
  }

  handleClick(e) {
    e.stopPropagation()
  }

  prepareImage(imageUri) {
    const img = new Image()
    if (!isDataURL(imageUri)) img.crossOrigin = 'anonymous'
    img.onload = () => {
      this.setState({
        preview: {
          scale: this.fitImageToCanvas(img.width, img.height),
          img,
        },
        scale: this.fitImageToCanvas(img.width, img.height),
      })
    }
    img.src = imageUri
  }

  @autobind
  handleCrop() {
    this.props.onCrop(this.refs.canvas.toDataURL())
  }

  @autobind
  onChange(e) {
    this.avatarCrop.zoom(e.target.value)
    this.avatarCrop.render()
    this.setState({
      scale: e.target.value,
    })
  }

  onMove() {}

  componentDidMount() {
    this.prepareImage(this.props.image)
    setTimeout(() => {
      this.avatarCrop = new AvatarCrop(this.refs.canvas, this.state.preview, this.onMove, true)
    }, 200)
  }

  render () {
    return (
      <div className="AvatarCropper-canvas" onClick={this.handleClick}>
        <div className="row justify-content-center">
          <div className="input-range-wrap">
            <i className="fa fa-search-minus" aria-hidden="true" />
            <input type="range" step="any" value={this.state.scale} min={defaults.minZoom} max={defaults.maxZoom} onChange={this.onChange} />
            <i className="fa fa-search-plus" aria-hidden="true" />
          </div>
          <div className="border">
            <canvas ref="canvas" width={this.props.width} height={this.props.height} />
          </div>
        </div>
        <div className="modal-footer">
          {
            this.props.onCancel ?
              <button className="btn btn-primary btn-lg pull-right" onClick={this.props.onCancel}>{this.props.cancelButtonCopy}</button>
            : null
          }
          <button className="btn btn-primary btn-lg pull-right" onClick={this.handleCrop} >{this.props.cropButtonCopy}</button>
        </div>
      </div>
    )
  }
}

export default Cropper
