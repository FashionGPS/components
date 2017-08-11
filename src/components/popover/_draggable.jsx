import React from 'react'
import { withInfo } from '@storybook/addon-info'
import autobind from 'autobind-decorator'
import ActionBar from '../action-bar/ActionBar'

const myRequestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

function bind(elem, evt, fn) {
  elem.addEventListener(evt, fn, false)
}

function unbind(elem, evt) {
  elem.removeEventListener(evt)
}

var defaults = {
  interactive: true,
  droppable: true,
  selectable: true,
  width: null,
  height: null,
  message: 'Drop an image or click to select one.',
  minZoom: 1,
  maxZoom: 2,
}

export function AvatarCrop(el, source, onChange, isNotRestricted) {
  this.canvas = el
  this._callbacks = {}
  this.filters = []
  this.isNotRestricted = isNotRestricted
  this.options = defaults
  this.onChange = onChange
  this.bindInteractive()
  this.setSource(source)
}

var proto = AvatarCrop.prototype

AvatarCrop.DEFAULT_WIDTH = 256
AvatarCrop.DEFAULT_HEIGHT = 256
AvatarCrop.DEFAULT_WHEEL_FACTOR = 100
AvatarCrop.DEFAULT_ANIM_DURATE = 250
AvatarCrop.DEFAULT_MODE = 'fit'

proto.addEventListener = function(name, fn) {
  this._callbacks[name] = this._callbacks[name] || []
  this._callbacks[name].push(fn)
}

proto.fire = function (evt) {
  var clbs = this._callbacks[evt] || []
  clbs.forEach(cb => {
    cb.apply(this)
  })
}

proto.bindInteractive = function () {
  var self = this,
      canvas = this.canvas,
      ctx = canvas.getContext('2d'),
      canMouseX = 0,
      canMouseY = 0,
      time = 0,
      pinchCenter = { x: 0, y: 0 },
      wheel = 0,
      isTouch = false,
      pinching = false,
      isDragging = false

  function handleMouseDown(e) {
    if (self.data) {
      if (e.type == 'touchstart') {
        if (e.timeStamp - time < 250) {
          return handleDblClick(e)
        }
        time = e.timeStamp
        isTouch = true
        if (e.touches && e.touches.length) {
          pinching = (e.touches.length == 2)
          e = e.touches[0]
        }
      }
      canMouseX = e.clientX + self._offsetX
      canMouseY = e.clientY + self._offsetY
      isDragging = true
    }
  }

  function handleMouseUp(e) {
    isDragging = false
    isTouch = false
    pinching = false
  }

  function handleMouseMove(e) {
    if (isDragging && isTouch == !!e.type.match('touch')) {
      e.preventDefault()
      e.stopPropagation()
      if (pinching && e.changedTouches && e.changedTouches.length == 2 && typeof e.scale !== 'undefined') {
        self.zoom(e.scale)
      } else {
        pinching = false
        if (e.changedTouches && e.changedTouches.length) {
          e = e.changedTouches[0]
        }
        self.move(e.clientX - canMouseX, e.clientY - canMouseY, 1)
      }
    }
  }

  function handleMouseWheel(e) {
    if (self.data && isDragging && isTouch == !!e.type.match('touch')) {
      e.stopPropagation()
      e.preventDefault()
      var delta = -(e.detail ? e.detail * (-120) : e.wheelDelta) / AvatarCrop.DEFAULT_WHEEL_FACTOR
      self.zoom(self._zoom + delta, 1)
      wheel = delta
      return false
    }
  }

  function handleDblClick(e) {
    if (self.data) {
      e.stopPropagation()
      e.preventDefault()
      if (self._zoom == 1) {
        if (self._offsetX == 0 && self._offsetY == 0) {
          self.fill().render()
        } else {
          self.center().render()
        }
      } else {
        self.fit().render()
      }
      return false
    }
  }

  bind(canvas, 'mousedown', handleMouseDown)
  bind(canvas, 'touchstart', handleMouseDown)
  bind(canvas, 'mousemove', handleMouseMove)
  bind(canvas, 'touchmove', handleMouseMove)
  bind(canvas, 'mouseup', handleMouseUp)
  bind(canvas, 'touchend', handleMouseUp)
  bind(canvas, 'mouseout', handleMouseUp)
  bind(canvas, 'touchcancel', handleMouseUp)
  bind(canvas, 'dblclick', handleDblClick)
  bind(canvas, 'mousewheel', handleMouseWheel)
  bind(canvas, 'DOMMouseScroll', handleMouseWheel)
}

proto.unbindInteractive = function() {
  var canvas = this.canvas
  unbind(canvas, 'mousedown')
  unbind(canvas, 'mousemove')
  unbind(canvas, 'mouseup')
  unbind(canvas, 'mouseout')
  unbind(canvas, 'dblclick')
  unbind(canvas, 'mousewheel')
  unbind(canvas, 'DOMMouseScroll')
}

proto.setSource = function(data) {
  const { img, scale } = data
  this.data = img
  this._zoom = scale
  this.scale = scale
  this.reset(0).render()
  this.canvas.style.cursor = 'move'
}

proto.fit = function(durate) {
  if (this._zoom) {
    return this.moveAndZoom(0, 0, this._zoom, (typeof durate !== 'undefined') ? durate : AvatarCrop.DEFAULT_ANIM_DURATE, 'init')
  }
}

proto.fill = function(durate) {
  if (this.data) {
    var image = this.data,
      imageW = image.width,
      imageH = image.height
    if (imageH > imageW) {
      this.moveAndZoom(0, 0, imageH / imageW, (typeof durate !== 'undefined') ? durate : AvatarCrop.DEFAULT_ANIM_DURATE, 'init')
    } else {
      this.moveAndZoom(0, 0, imageW / imageH, (typeof durate !== 'undefined') ? durate : AvatarCrop.DEFAULT_ANIM_DURATE, 'init')
    }
  }
  return this
}

proto.move = function(x, y, durate) {
  return this.moveAndZoom(x, y, this._zoom, durate)
}

proto.zoom = function(zoom, durate) {
  var x = (-this._offsetX / this._zoom) * zoom,
    y = (-this._offsetY / this._zoom) * zoom
  return this.moveAndZoom(x, y, zoom, durate)
}

proto.moveAndZoom = function(x, y, zoom, durate, extra) {
  if (this.data) {
    durate = durate || 0
    x = -x
    y = -y
    var self = this,
      options = this.options,
      start = Date.now(),
      end = start + durate,
      startZoom = this._zoom,
      startX = this._offsetX,
      startY = this._offsetY,
      rangeZoom = zoom - startZoom,
      rangeX = x - startX,
      rangeY = y - startY

    zoom = Math.min(Math.max(zoom, options.minZoom), options.maxZoom)

    function setVals(xTmp, yTmp, zoomTmp) {

      const { data, canvas } = self
      const ratio = canvas.width / canvas.height
      const imageRap = ratio > 1 ? data.width / canvas.width : data.height / canvas.height
      const boundaryX = xTmp / zoomTmp * imageRap + (data.width - canvas.width / zoomTmp * imageRap) / 2
      const boundaryY = yTmp / zoomTmp * imageRap + (data.height - canvas.height / zoomTmp * imageRap) / 2

      if (self.isNotRestricted || extra || (boundaryX > 0 && boundaryX + canvas.width / zoomTmp * imageRap < data.width)) self._offsetX = xTmp
      if (self.isNotRestricted || extra || (boundaryY > 0 && boundaryY + canvas.height / zoomTmp * imageRap < data.height)) self._offsetY = yTmp

      self._zoom = zoomTmp
      if (durate) {
        self.render()
      }
    }

    if (durate && durate !== 1) {
      var animate = function() {
        myRequestAnimFrame(function () {
          var time = Date.now(),
            frame = Math.min(time - start, durate) / durate,
            fracZoom = rangeZoom * frame,
            zoomTmp = startZoom + fracZoom,
            fracX = rangeX * frame,
            xTmp = startX + fracX,
            fracY = rangeY * frame,
            yTmp = startY + fracY

          setVals(xTmp, yTmp, zoomTmp)
          if (time < end) animate()
        }, 10)
      }
      animate()
    } else {
      setVals(x, y, zoom)
    }
  }
  return this
}

proto.reset = function(durate) {
  if (typeof this[AvatarCrop.DEFAULT_MODE] == 'function') {
    this[AvatarCrop.DEFAULT_MODE].call(this, durate)
  }
  return this
}

proto.center = function(durate) {
  return this.moveAndZoom(0, 0, this._zoom, (typeof durate !== 'undefined') ? durate : AvatarCrop.DEFAULT_ANIM_DURATE)
}

proto.render = function() {
  if (this.data) {
    var self = this,
      image = this.data,
      zoom = this._zoom,
      canvas = this.canvas,
      ctx = canvas.getContext('2d'),
      imageW = image.width,
      imageH = image.height,
      rap = imageW / imageH,
      ratio = canvas.width / canvas.height,
      dx, dy, dwidth, dheight, w, h

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (ratio < 1) {
      w = canvas.height * rap
      dx = (canvas.width - w * zoom) / 2 - this._offsetX
      dy = (canvas.height - canvas.height * zoom) / 2 - this._offsetY
      dwidth = w * zoom
      dheight = canvas.height * zoom
    } else {
      h = canvas.width / rap
      dx = (canvas.width - canvas.width * zoom) / 2 - this._offsetX
      dy = (canvas.height - h * zoom) / 2 - this._offsetY
      dwidth = canvas.width * zoom
      dheight = h * zoom
    }
    ctx.drawImage(image, 0, 0, imageW, imageH, dx, dy, dwidth, dheight)

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

    ctx.putImageData(imageData, 0, 0)
    clearTimeout(self.fireTimeout)
    self.fireTimeout = setTimeout(() => {
      self.fire('change')
      const imageRap = ratio > 1 ? imageW / canvas.width : imageH / canvas.height
      const imageRatio = ratio > 1 ? canvas.height / canvas.width : canvas.width / canvas.height

      const applyZoom = off => {
        return off / zoom
      }

      this.onChange({
        image_crop_x: (applyZoom(this._offsetX) * imageRap) + (imageW - applyZoom(canvas.width) * imageRap) / 2,
        image_crop_y: (applyZoom(this._offsetY) * imageRap) + (imageH - applyZoom(canvas.height) * imageRap) / 2,
        image_crop_w: ratio > 1 ? applyZoom(imageW) : applyZoom(imageH) * imageRatio,
        image_crop_h: ratio < 1 ? applyZoom(imageH) : applyZoom(imageW) * imageRatio,
      })
      delete self.fireTimeout
    }, 250)
  }
}

proto.save = function() {
  if (this.data) {
    return this.canvas.toDataURL()
  }
}

export default class Draggable extends React.Component {
  constructor() {
    super()
    this.state = {
      value: 1,
    }
  }

  componentDidMount() {
    this.loadImage()
  }

  @autobind
  onChange(e) {
    this.avatarCrop.zoom(e.target.value)
    this.avatarCrop.render()
    this.setState({
      value: e.target.value,
    })
  }

  loadImage() {
    if (this.canvas) {
      this.avatarCrop = new AvatarCrop(this.canvas, this.props.preview, this.props.onChange)
    }
  }

  maximizeImage(e) {
    e.preventDefault()
    if (this.canvas) {
      this.avatarCrop.fit()
    }
  }

  render() {
    return (
      <div className="draggable">
        <ActionBar
          actions={[
            { key: 'edit', icon: 'typicons-maximize', handle: this.maximizeImage.bind(this), tooltipContent: 'Reset image position', hidden: false },
          ]}
        />
        <div className="input-range-wrap">
          <i className="fa fa-search-minus" aria-hidden="true" />
          <input type="range" step="any" value={this.state.value} min={defaults.minZoom} max={defaults.maxZoom} onChange={this.onChange} />
          <i className="fa fa-search-plus" aria-hidden="true" />
        </div>
        <canvas ref={can => { this.canvas = can}} style={{ width: '100%' }} width={this.props.width} height={this.props.height} />
      </div>
    )
  }
}
