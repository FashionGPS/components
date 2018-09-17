'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _utils = require('./utils.js');

var _draggable = require('../_draggable');

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

var defaults = {
  minZoom: 1,
  maxZoom: 4
};

var Cropper = (_class = function (_React$Component) {
  _inherits(Cropper, _React$Component);

  function Cropper() {
    _classCallCheck(this, Cropper);

    var _this = _possibleConstructorReturn(this, (Cropper.__proto__ || Object.getPrototypeOf(Cropper)).call(this));

    _this.state = {
      dragging: false,
      preview: null,
      scale: 1
    };
    return _this;
  }

  _createClass(Cropper, [{
    key: 'fitImageToCanvas',
    value: function fitImageToCanvas(width, height) {
      var scaledHeight, scaledWidth, scaleRatio;

      var canvasAspectRatio = this.props.height / this.props.width;
      var imageAspectRatio = height / width;

      if (canvasAspectRatio > imageAspectRatio) {
        scaledHeight = this.props.height;
        scaleRatio = scaledHeight / height;
        scaledWidth = width * scaleRatio;
      } else {
        scaledWidth = this.props.width;
        scaleRatio = scaledWidth / width;
        scaledHeight = height * scaleRatio;
      }

      return scaleRatio < defaults.minZoom ? defaults.minZoom : scaleRatio > defaults.maxZoom ? defaults.maxZoom : scaleRatio;
      // return scaleRatio
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.stopPropagation();
    }
  }, {
    key: 'prepareImage',
    value: function prepareImage(imageUri) {
      var _this2 = this;

      var img = new Image();
      if (!(0, _utils.isDataURL)(imageUri)) img.crossOrigin = 'anonymous';
      img.onload = function () {
        _this2.setState({
          preview: {
            scale: _this2.fitImageToCanvas(img.width, img.height),
            img: img
          },
          scale: _this2.fitImageToCanvas(img.width, img.height)
        });
      };
      img.src = imageUri;
    }
  }, {
    key: 'handleCrop',
    value: function handleCrop() {
      this.props.onCrop(this.refs.canvas.toDataURL());
    }
  }, {
    key: 'onChange',
    value: function onChange(e) {
      this.avatarCrop.zoom(e.target.value);
      this.avatarCrop.render();
      this.setState({
        scale: e.target.value
      });
    }
  }, {
    key: 'onMove',
    value: function onMove() {}
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      this.prepareImage(this.props.image);
      setTimeout(function () {
        _this3.avatarCrop = new _draggable.AvatarCrop(_this3.refs.canvas, _this3.state.preview, _this3.onMove, true);
      }, 200);
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'AvatarCropper-canvas', onClick: this.handleClick },
        _react2.default.createElement(
          'div',
          { className: 'row justify-content-center' },
          _react2.default.createElement(
            'div',
            { className: 'input-range-wrap' },
            _react2.default.createElement('i', { className: 'fa fa-search-minus', 'aria-hidden': 'true' }),
            _react2.default.createElement('input', { type: 'range', step: 'any', value: this.state.scale, min: defaults.minZoom, max: defaults.maxZoom, onChange: this.onChange }),
            _react2.default.createElement('i', { className: 'fa fa-search-plus', 'aria-hidden': 'true' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'border' },
            _react2.default.createElement('canvas', { ref: 'canvas', width: this.props.width, height: this.props.height })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'modal-footer' },
          this.props.onCancel ? _react2.default.createElement(
            'button',
            { className: 'btn btn-primary btn-lg pull-right', onClick: this.props.onCancel },
            this.props.cancelButtonCopy
          ) : null,
          _react2.default.createElement(
            'button',
            { className: 'btn btn-primary btn-lg pull-right', onClick: this.handleCrop },
            this.props.cropButtonCopy
          )
        )
      );
    }
  }]);

  return Cropper;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'handleCrop', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleCrop'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'onChange', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'onChange'), _class.prototype)), _class);
exports.default = Cropper;