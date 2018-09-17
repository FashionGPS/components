'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _portal = require('./_portal');

var _portal2 = _interopRequireDefault(_portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ZoomedImage = (_temp = _class = function (_React$Component) {
  _inherits(ZoomedImage, _React$Component);

  function ZoomedImage() {
    _classCallCheck(this, ZoomedImage);

    var _this = _possibleConstructorReturn(this, (ZoomedImage.__proto__ || Object.getPrototypeOf(ZoomedImage)).call(this));

    _this.handleKeyDown = function (event) {
      if (event.key === 'Escape') {
        _this.handleClose();
      }
    };

    _this.handleBackdropClick = function (event) {
      _this.handleClose();
      event.stopPropagation();
      event.preventDefault();
    };

    _this.renderPortal = function () {
      var _this$props = _this.props,
          image = _this$props.image,
          isOpen = _this$props.isOpen,
          width = _this$props.width,
          height = _this$props.height;

      var imgLargerThanWindow = window.innerWidth < width;
      return _react2.default.createElement(
        _portal2.default,
        {
          isOpen: isOpen,
          scrollContainer: window.document.body,
          onOpen: _this.addListener,
          className: 'portal'
        },
        _react2.default.createElement(
          'div',
          { className: 'overlay', onClick: _this.handleBackdropClick },
          _react2.default.createElement('div', { className: 'close-btn', onClick: _this.handleClose }),
          _react2.default.createElement(
            'div',
            { className: 'zoom_view_container', style: { width: '100%', height: '100%', position: 'relative', overflowY: 'auto', overflowX: 'hidden' } },
            _react2.default.createElement(
              'div',
              { className: 'zoom_image_container', style: { height: imgLargerThanWindow ? window.innerHeight : height, width: width, position: 'absolute', marginLeft: imgLargerThanWindow ? 0 : (window.innerWidth - width) / 2 } },
              _react2.default.createElement('img', { src: image, alt: '', style: { width: imgLargerThanWindow ? window.innerWidth : '100%' } })
            )
          )
        )
      );
    };

    _this.handleClose = _this.handleClose.bind(_this);
    return _this;
  }

  _createClass(ZoomedImage, [{
    key: 'handleClose',
    value: function handleClose() {
      this.props.onToggle(false);
    }
  }, {
    key: 'addListener',
    value: function addListener() {
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          isOpen = _props.isOpen,
          onToggle = _props.onToggle,
          image = _props.image;

      return isOpen ? this.renderPortal() : _react2.default.createElement('img', { src: image, alt: 'Beautiful tournesold field', width: 500, height: 300, onClick: onToggle });
    }
  }]);

  return ZoomedImage;
}(_react2.default.Component), _class.propTypes = {
  image: _propTypes2.default.string.isRequired,
  width: _propTypes2.default.number.isRequired,
  height: _propTypes2.default.number.isRequired,
  onToggle: _propTypes2.default.func.isRequired,
  isOpen: _propTypes2.default.bool.isRequired
}, _temp);
exports.default = ZoomedImage;