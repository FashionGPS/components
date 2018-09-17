'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

exports.AvatarCrop = AvatarCrop;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _ActionBar = require('../action-bar/ActionBar');

var _ActionBar2 = _interopRequireDefault(_ActionBar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var myRequestAnimFrame = function () {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
}();

function bind(elem, evt, fn) {
  elem.addEventListener(evt, fn, false);
}

function unbind(elem, evt) {
  elem.removeEventListener(evt);
}

var defaults = {
  interactive: true,
  droppable: true,
  selectable: true,
  width: null,
  height: null,
  message: 'Drop an image or click to select one.',
  minZoom: 1,
  maxZoom: 2
};

function AvatarCrop(el, source, onChange, isNotRestricted) {
  this.canvas = el;
  this._callbacks = {};
  this.filters = [];
  this.isNotRestricted = isNotRestricted;
  this.options = defaults;
  this.onChange = onChange;
  this.bindInteractive();
  this.setSource(source);
}

var proto = AvatarCrop.prototype;

AvatarCrop.DEFAULT_WIDTH = 256;
AvatarCrop.DEFAULT_HEIGHT = 256;
AvatarCrop.DEFAULT_WHEEL_FACTOR = 100;
AvatarCrop.DEFAULT_ANIM_DURATE = 250;
AvatarCrop.DEFAULT_MODE = 'fit';

proto.addEventListener = function (name, fn) {
  this._callbacks[name] = this._callbacks[name] || [];
  this._callbacks[name].push(fn);
};

proto.fire = function (evt) {
  var _this = this;

  var clbs = this._callbacks[evt] || [];
  clbs.forEach(function (cb) {
    cb.apply(_this);
  });
};

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
      isDragging = false;

  function handleMouseDown(e) {
    if (self.data) {
      if (e.type == 'touchstart') {
        if (e.timeStamp - time < 250) {
          return handleDblClick(e);
        }
        time = e.timeStamp;
        isTouch = true;
        if (e.touches && e.touches.length) {
          pinching = e.touches.length == 2;
          e = e.touches[0];
        }
      }
      canMouseX = e.clientX + self._offsetX;
      canMouseY = e.clientY + self._offsetY;
      isDragging = true;
    }
  }

  function handleMouseUp(e) {
    isDragging = false;
    isTouch = false;
    pinching = false;
  }

  function handleMouseMove(e) {
    if (isDragging && isTouch == !!e.type.match('touch')) {
      e.preventDefault();
      e.stopPropagation();
      if (pinching && e.changedTouches && e.changedTouches.length == 2 && typeof e.scale !== 'undefined') {
        self.zoom(e.scale);
      } else {
        pinching = false;
        if (e.changedTouches && e.changedTouches.length) {
          e = e.changedTouches[0];
        }
        self.move(e.clientX - canMouseX, e.clientY - canMouseY, 1);
      }
    }
  }

  function handleMouseWheel(e) {
    if (self.data && isDragging && isTouch == !!e.type.match('touch')) {
      e.stopPropagation();
      e.preventDefault();
      var delta = -(e.detail ? e.detail * -120 : e.wheelDelta) / AvatarCrop.DEFAULT_WHEEL_FACTOR;
      self.zoom(self._zoom + delta, 1);
      wheel = delta;
      return false;
    }
  }

  function handleDblClick(e) {
    if (self.data) {
      e.stopPropagation();
      e.preventDefault();
      if (self._zoom == 1) {
        if (self._offsetX == 0 && self._offsetY == 0) {
          self.fill().render();
        } else {
          self.center().render();
        }
      } else {
        self.fit().render();
      }
      return false;
    }
  }

  bind(canvas, 'mousedown', handleMouseDown);
  bind(canvas, 'touchstart', handleMouseDown);
  bind(canvas, 'mousemove', handleMouseMove);
  bind(canvas, 'touchmove', handleMouseMove);
  bind(canvas, 'mouseup', handleMouseUp);
  bind(canvas, 'touchend', handleMouseUp);
  bind(canvas, 'mouseout', handleMouseUp);
  bind(canvas, 'touchcancel', handleMouseUp);
  bind(canvas, 'dblclick', handleDblClick);
  bind(canvas, 'mousewheel', handleMouseWheel);
  bind(canvas, 'DOMMouseScroll', handleMouseWheel);
};

proto.unbindInteractive = function () {
  var canvas = this.canvas;
  unbind(canvas, 'mousedown');
  unbind(canvas, 'mousemove');
  unbind(canvas, 'mouseup');
  unbind(canvas, 'mouseout');
  unbind(canvas, 'dblclick');
  unbind(canvas, 'mousewheel');
  unbind(canvas, 'DOMMouseScroll');
};

proto.setSource = function (data) {
  var img = data.img,
      scale = data.scale;

  this.data = img;
  this._zoom = scale;
  this.scale = scale;
  this.reset(0).render();
  this.canvas.style.cursor = 'move';
};

proto.fit = function (durate) {
  if (this._zoom) {
    return this.moveAndZoom(0, 0, this._zoom, typeof durate !== 'undefined' ? durate : AvatarCrop.DEFAULT_ANIM_DURATE, 'init');
  }
};

proto.fill = function (durate) {
  if (this.data) {
    var image = this.data,
        imageW = image.width,
        imageH = image.height;
    if (imageH > imageW) {
      this.moveAndZoom(0, 0, imageH / imageW, typeof durate !== 'undefined' ? durate : AvatarCrop.DEFAULT_ANIM_DURATE, 'init');
    } else {
      this.moveAndZoom(0, 0, imageW / imageH, typeof durate !== 'undefined' ? durate : AvatarCrop.DEFAULT_ANIM_DURATE, 'init');
    }
  }
  return this;
};

proto.move = function (x, y, durate) {
  return this.moveAndZoom(x, y, this._zoom, durate);
};

proto.zoom = function (zoom, durate) {
  var x = -this._offsetX / this._zoom * zoom,
      y = -this._offsetY / this._zoom * zoom;
  return this.moveAndZoom(x, y, zoom, durate);
};

proto.moveAndZoom = function (x, y, zoom, durate, extra) {
  if (this.data) {
    var setVals = function setVals(xTmp, yTmp, zoomTmp) {
      var data = self.data,
          canvas = self.canvas;

      var ratio = canvas.width / canvas.height;
      var imageRap = ratio > 1 ? data.width / canvas.width : data.height / canvas.height;
      var boundaryX = xTmp / zoomTmp * imageRap + (data.width - canvas.width / zoomTmp * imageRap) / 2;
      var boundaryY = yTmp / zoomTmp * imageRap + (data.height - canvas.height / zoomTmp * imageRap) / 2;

      if (self.isNotRestricted || extra || boundaryX > 0 && boundaryX + canvas.width / zoomTmp * imageRap < data.width) self._offsetX = xTmp;
      if (self.isNotRestricted || extra || boundaryY > 0 && boundaryY + canvas.height / zoomTmp * imageRap < data.height) self._offsetY = yTmp;

      self._zoom = zoomTmp;
      if (durate) {
        self.render();
      }
    };

    durate = durate || 0;
    x = -x;
    y = -y;
    var self = this,
        options = this.options,
        start = Date.now(),
        end = start + durate,
        startZoom = this._zoom,
        startX = this._offsetX,
        startY = this._offsetY,
        rangeZoom = zoom - startZoom,
        rangeX = x - startX,
        rangeY = y - startY;

    zoom = Math.min(Math.max(zoom, options.minZoom), options.maxZoom);

    if (durate && durate !== 1) {
      var animate = function animate() {
        myRequestAnimFrame(function () {
          var time = Date.now(),
              frame = Math.min(time - start, durate) / durate,
              fracZoom = rangeZoom * frame,
              zoomTmp = startZoom + fracZoom,
              fracX = rangeX * frame,
              xTmp = startX + fracX,
              fracY = rangeY * frame,
              yTmp = startY + fracY;

          setVals(xTmp, yTmp, zoomTmp);
          if (time < end) animate();
        }, 10);
      };
      animate();
    } else {
      setVals(x, y, zoom);
    }
  }
  return this;
};

proto.reset = function (durate) {
  if (typeof this[AvatarCrop.DEFAULT_MODE] == 'function') {
    this[AvatarCrop.DEFAULT_MODE].call(this, durate);
  }
  return this;
};

proto.center = function (durate) {
  return this.moveAndZoom(0, 0, this._zoom, typeof durate !== 'undefined' ? durate : AvatarCrop.DEFAULT_ANIM_DURATE);
};

proto.render = function () {
  var _this2 = this;

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
        dx,
        dy,
        dwidth,
        dheight,
        w,
        h;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (ratio < 1) {
      w = canvas.height * rap;
      dx = (canvas.width - w * zoom) / 2 - this._offsetX;
      dy = (canvas.height - canvas.height * zoom) / 2 - this._offsetY;
      dwidth = w * zoom;
      dheight = canvas.height * zoom;
    } else {
      h = canvas.width / rap;
      dx = (canvas.width - canvas.width * zoom) / 2 - this._offsetX;
      dy = (canvas.height - h * zoom) / 2 - this._offsetY;
      dwidth = canvas.width * zoom;
      dheight = h * zoom;
    }
    ctx.drawImage(image, 0, 0, imageW, imageH, dx, dy, dwidth, dheight);

    var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    ctx.putImageData(imageData, 0, 0);
    clearTimeout(self.fireTimeout);
    self.fireTimeout = setTimeout(function () {
      self.fire('change');
      var imageRap = ratio > 1 ? imageW / canvas.width : imageH / canvas.height;
      var imageRatio = ratio > 1 ? canvas.height / canvas.width : canvas.width / canvas.height;

      var applyZoom = function applyZoom(off) {
        return off / zoom;
      };

      _this2.onChange({
        image_crop_x: applyZoom(_this2._offsetX) * imageRap + (imageW - applyZoom(canvas.width) * imageRap) / 2,
        image_crop_y: applyZoom(_this2._offsetY) * imageRap + (imageH - applyZoom(canvas.height) * imageRap) / 2,
        image_crop_w: ratio > 1 ? applyZoom(imageW) : applyZoom(imageH) * imageRatio,
        image_crop_h: ratio < 1 ? applyZoom(imageH) : applyZoom(imageW) * imageRatio
      });
      delete self.fireTimeout;
    }, 250);
  }
};

proto.save = function () {
  if (this.data) {
    return this.canvas.toDataURL();
  }
};

var Draggable = (_class = function (_React$Component) {
  _inherits(Draggable, _React$Component);

  function Draggable() {
    _classCallCheck(this, Draggable);

    var _this3 = _possibleConstructorReturn(this, (Draggable.__proto__ || Object.getPrototypeOf(Draggable)).call(this));

    _this3.state = {
      value: 1
    };
    return _this3;
  }

  _createClass(Draggable, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadImage();
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.avatarCrop.zoom(e.target.value);
      this.avatarCrop.render();
      this.setState({
        value: e.target.value
      });
    }
  }, {
    key: 'loadImage',
    value: function loadImage() {
      if (this.canvas) {
        this.avatarCrop = new AvatarCrop(this.canvas, this.props.preview, this.props.onChange);
      }
    }
  }, {
    key: 'maximizeImage',
    value: function maximizeImage(e) {
      e.preventDefault();
      if (this.canvas) {
        this.avatarCrop.fit();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        { className: 'draggable' },
        _react2.default.createElement(_ActionBar2.default, {
          actions: [{ key: 'edit', icon: 'typicons-maximize', handle: this.maximizeImage.bind(this), tooltipContent: 'Reset image position', hidden: false }]
        }),
        _react2.default.createElement(
          'div',
          { className: 'input-range-wrap' },
          _react2.default.createElement('i', { className: 'fa fa-search-minus', 'aria-hidden': 'true' }),
          _react2.default.createElement('input', { type: 'range', step: 'any', value: this.state.value, min: defaults.minZoom, max: defaults.maxZoom, onChange: this.onChange }),
          _react2.default.createElement('i', { className: 'fa fa-search-plus', 'aria-hidden': 'true' })
        ),
        _react2.default.createElement('canvas', { ref: function ref(can) {
            _this4.canvas = can;
          }, style: { width: '100%' }, width: this.props.width, height: this.props.height })
      );
    }
  }]);

  return Draggable;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'onChange', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'onChange'), _class.prototype)), _class);
exports.default = Draggable;