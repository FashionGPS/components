'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Css = require('../spinner/Css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AsyncButton = (_temp = _class = function (_React$PureComponent) {
  _inherits(AsyncButton, _React$PureComponent);

  function AsyncButton() {
    _classCallCheck(this, AsyncButton);

    var _this = _possibleConstructorReturn(this, (AsyncButton.__proto__ || Object.getPrototypeOf(AsyncButton)).call(this));

    _this.state = {
      spinning: false,
      success: false
    };
    return _this;
  }

  _createClass(AsyncButton, [{
    key: 'isSending',
    value: function isSending(bool) {
      this.setState({ spinning: bool });
    }
  }, {
    key: 'success',
    value: function success() {
      var _this2 = this;

      this.setState({ success: true });
      _lodash2.default.delay(function () {
        _this2.setState({ success: false });
      }, 700);
    }
  }, {
    key: 'render',
    value: function render() {
      var _cn;

      var btnClass = (0, _classnames2.default)('async-btn', (_cn = {}, _defineProperty(_cn, 'pull-' + this.props.align, this.props.align), _defineProperty(_cn, 'async-btn--' + this.props.kind, this.props.kind), _defineProperty(_cn, 'spinning', this.state.spinning), _cn), this.props.className);

      var buttonSuccess = _react2.default.createElement(
        'div',
        { style: { minWidth: this.props.width }, className: 'success-btn ' + btnClass },
        _react2.default.createElement('div', { className: 'fill' }),
        _react2.default.createElement(
          'div',
          { className: 'success-btn-label' },
          'Success'
        )
      );

      var buttonActive = _react2.default.createElement(
        'button',
        { style: { minWidth: this.props.width }, className: btnClass, type: 'submit', disabled: this.props.disabled, onClick: this.props.onClick },
        this.state.spinning ? _react2.default.createElement(_Css.CssSpinner, { type: 'rays' }) : null,
        _typeof(this.props.icon) === 'object' ? _react2.default.createElement(
          'i',
          { style: { width: 40 } },
          this.props.icon
        ) : _react2.default.createElement('i', { className: this.props.icon }),
        _react2.default.createElement(
          'span',
          null,
          this.props.title
        )
      );
      return this.state.success ? buttonSuccess : buttonActive;
    }
  }]);

  return AsyncButton;
}(_react2.default.PureComponent), _class.defaultProps = {
  disabled: false,
  kind: 'primary',
  align: 'left',
  width: 100,
  className: '',
  icon: 'fa fa-home',
  title: 'I am a button'
}, _class.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  kind: _propTypes2.default.string,
  align: _propTypes2.default.string,
  title: _propTypes2.default.string,
  className: _propTypes2.default.string,
  width: _propTypes2.default.number,
  disabled: _propTypes2.default.bool,
  icon: _propTypes2.default.oneOfType([_propTypes2.default.element, _propTypes2.default.string])
}, _temp);
exports.default = AsyncButton;