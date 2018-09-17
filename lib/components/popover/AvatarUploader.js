'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDropzone = require('react-dropzone');

var _reactDropzone2 = _interopRequireDefault(_reactDropzone);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _es6Promise = require('es6-promise');

var _es6Promise2 = _interopRequireDefault(_es6Promise);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _portal = require('./_portal');

var _portal2 = _interopRequireDefault(_portal);

var _AsyncButton = require('../button/AsyncButton');

var _AsyncButton2 = _interopRequireDefault(_AsyncButton);

var _modalCropper = require('./avatar-cropper/modal-cropper');

var _modalCropper2 = _interopRequireDefault(_modalCropper);

var _utils = require('./avatar-cropper/utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AvatarUploader = (0, _autobindDecorator2.default)(_class = function (_React$Component) {
  _inherits(AvatarUploader, _React$Component);

  function AvatarUploader() {
    _classCallCheck(this, AvatarUploader);

    var _this = _possibleConstructorReturn(this, (AvatarUploader.__proto__ || Object.getPrototypeOf(AvatarUploader)).call(this));

    _this.state = {
      promiseCallbacks: null
    };
    return _this;
  }

  _createClass(AvatarUploader, [{
    key: 'onDrop',
    value: function onDrop(files) {
      var _this2 = this;

      if ((0, _utils.isDataURL)(files)) {
        this.displayPreview(files).then(this.props.onCrop, this.handleClose);
      } else {
        var reader = new FileReader();
        reader.onload = function () {
          _this2.displayPreview(reader.result, files[0].type).then(_this2.props.onCrop, _this2.handleClose);
        };
        if (_lodash2.default.isObject(files[0])) reader.readAsDataURL(files[0]);
      }
    }
  }, {
    key: 'handleDropping',
    value: function handleDropping(e) {
      e.stopPropagation();
      e.preventDefault();
      if (e.target.nodeName.toLowerCase() === 'img' && this.props.croppedImage) {
        this.onDrop(this.props.croppedImage);
      } else {
        this.dropzone.open();
      }
    }
  }, {
    key: 'displayPreview',
    value: function displayPreview(dataUrl, type) {
      var _this3 = this;

      return new _es6Promise2.default(function (resolve, reject) {
        _this3.setState({
          promiseCallbacks: {
            type: type || 'image/jpeg',
            dataUrl: dataUrl,
            resolve: resolve,
            reject: reject
          }
        }, _this3.props.onToggle);
      });
    }
  }, {
    key: 'addListener',
    value: function addListener() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'handleKeyDown',
    value: function handleKeyDown(event) {
      if (event.key === 'Escape') {
        this.handleClose();
      }
    }
  }, {
    key: 'handleClose',
    value: function handleClose(options) {
      this.props.onToggle(options);
      this.setState({ promiseCallbacks: null });
    }
  }, {
    key: 'handleBackdropClick',
    value: function handleBackdropClick(event) {
      this.handleClose();
      event.stopPropagation();
      event.preventDefault();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var dropzoneStyles = {
        width: 'inherit',
        height: 'inherit',
        border: 0
      };

      var _props = this.props,
          defaultImage = _props.defaultImage,
          isToggled = _props.isToggled,
          className = _props.className,
          croppedImage = _props.croppedImage,
          width = _props.width,
          height = _props.height;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('avatar-uploader', className) },
        _react2.default.createElement(
          _reactDropzone2.default,
          { ref: function ref(d) {
              _this4.dropzone = d;
            }, onDrop: this.onDrop, style: dropzoneStyles, accept: 'image/*' },
          _react2.default.createElement('img', { onClick: this.handleDropping, width: width, height: height, src: croppedImage || defaultImage, alt: 'Choose a sthg for your avatar' })
        ),
        _react2.default.createElement(
          'div',
          { style: { paddingTop: 20 } },
          _react2.default.createElement(_AsyncButton2.default, { type: 'button', className: 'btn btn-secondary btn-sm', onClick: this.handleDropping, title: 'Add a profile picture' })
        ),
        _react2.default.createElement(
          _portal2.default,
          {
            isOpen: isToggled,
            scrollContainer: window.document.body,
            onOpen: this.addListener,
            className: 'portal'
          },
          _react2.default.createElement(
            'div',
            { className: 'overlay', onClick: this.handleClose },
            _react2.default.createElement(_modalCropper2.default, {
              croppedImage: croppedImage,
              cancelButtonCopy: 'clear the damn thing',
              cropButtonCopy: 'crop it !',
              width: width,
              onClose: this.props.onToggle,
              height: height,
              promiseCallbacks: this.state.promiseCallbacks
            })
          )
        )
      );
    }
  }]);

  return AvatarUploader;
}(_react2.default.Component)) || _class;

exports.default = AvatarUploader;