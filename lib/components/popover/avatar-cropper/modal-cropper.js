'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _createReactClass = require('create-react-class');

var _createReactClass2 = _interopRequireDefault(_createReactClass);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _avatarCropper = require('./avatar-cropper');

var _avatarCropper2 = _interopRequireDefault(_avatarCropper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _createReactClass2.default)({
  propTypes: {
    file: _propTypes2.default.object.isRequired,
    image: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func.isRequired,
    closeButtonCopy: _propTypes2.default.string,
    cropButtonCopy: _propTypes2.default.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      width: 400,
      height: 400,
      style: {},
      closeButtonCopy: 'Close',
      cropButtonCopy: 'Crop and Save'
    };
  },
  onCancel: function onCancel() {
    if (this.props.promiseCallbacks) this.props.promiseCallbacks.reject({ reset: true });
  },
  onCrop: function onCrop(dataUrl) {
    if (this.props.promiseCallbacks) {
      // https://github.com/ebidel/filer.js/blob/master/src/filer.js#L137
      // const blob = this.dataURLToBlob(dataUrl) // upload new file to server ?
      this.props.promiseCallbacks.resolve(dataUrl);
      this.props.onClose();
    }
  },
  dataURLToBlob: function dataURLToBlob(dataURL) {
    var BASE64_MARKER = 'base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
      var _parts = dataURL.split(',');
      var _raw = decodeURIComponent(_parts[1]);
      return new Blob([_raw], { type: this.props.promiseCallbacks.type });
    }

    var parts = dataURL.split(BASE64_MARKER);
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);
    _lodash2.default.times(rawLength, function (i) {
      uInt8Array[i] = raw.charCodeAt(i);
    });
    return new Blob([uInt8Array], { type: this.props.promiseCallbacks.type });
  },
  render: function render() {
    return _react2.default.createElement(_avatarCropper2.default, {
      image: this.props.promiseCallbacks ? this.props.promiseCallbacks.dataUrl : this.props.croppedImage,
      width: this.props.width,
      height: this.props.height,
      style: this.props.style,
      onCrop: this.onCrop,
      onCancel: this.onCancel,
      cancelButtonCopy: this.props.cancelButtonCopy,
      cropButtonCopy: this.props.cropButtonCopy
    });
  }
});