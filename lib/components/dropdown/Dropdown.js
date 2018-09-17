'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactClickOutside = require('react-click-outside');

var _reactClickOutside2 = _interopRequireDefault(_reactClickOutside);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Dropdown = (0, _reactClickOutside2.default)(_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(Dropdown, _React$PureComponent);

  function Dropdown() {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this));

    _this.state = {
      isOpened: false
    };
    return _this;
  }

  _createClass(Dropdown, [{
    key: 'handleAction',
    value: function handleAction() {
      if (this.onClick) this.onClick(this.title);
    }
  }, {
    key: 'handleClickOutside',
    value: function handleClickOutside(bool) {
      this.setState({ isOpened: !bool || false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classDropdown = (0, _classnames2.default)('dropdown-menu', {
        show: this.state.isOpened
      });

      return _react2.default.createElement(
        'div',
        { className: 'dropdown' },
        _react2.default.createElement(
          'button',
          { className: 'dropdown-label', onClick: function onClick() {
              return _this2.handleClickOutside(_this2.state.isOpened);
            } },
          _react2.default.createElement('i', { className: 'fa fa-share' }),
          'Share'
        ),
        _react2.default.createElement(
          'ul',
          { className: classDropdown },
          this.props.options.map(function (option) {
            return _react2.default.createElement(
              'li',
              { key: option.index, onClick: _this2.handleAction.bind(option) },
              option.href ? _react2.default.createElement(
                'a',
                { href: option.href, rel: 'noopener noreferrer', target: '_blank' },
                option.title
              ) : _react2.default.createElement(
                'span',
                null,
                option.title
              )
            );
          })
        )
      );
    }
  }]);

  return Dropdown;
}(_react2.default.PureComponent), _class2.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    index: _propTypes2.default.string,
    title: _propTypes2.default.string,
    href: _propTypes2.default.string
  })).isRequired
}, _temp)) || _class;

exports.default = Dropdown;