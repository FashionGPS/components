'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactUikitBase = require('react-uikit-base');

var _cuid = require('cuid');

var _cuid2 = _interopRequireDefault(_cuid);

var _velocityAnimate = require('velocity-animate');

var _velocityAnimate2 = _interopRequireDefault(_velocityAnimate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var NotifyMessage = function (_React$Component) {
  _inherits(NotifyMessage, _React$Component);

  function NotifyMessage(props) {
    _classCallCheck(this, NotifyMessage);

    var _this = _possibleConstructorReturn(this, (NotifyMessage.__proto__ || Object.getPrototypeOf(NotifyMessage)).call(this, props));

    _this.state = {
      messages: []
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.handleTimeout = _this.handleTimeout.bind(_this);
    return _this;
  }

  _createClass(NotifyMessage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.handleNotifyIn(this.props.kitid);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      this.props.onClick(e, this.props.kitid);
    }
  }, {
    key: 'handleTimeout',
    value: function handleTimeout(duration, kitid) {
      var _this2 = this;

      if (duration) {
        setTimeout(function () {
          _this2.handleNotifyOut(_this2.props.kitid, _this2.props.onFade);
        }, duration);
      }
    }
  }, {
    key: 'handleNotifyIn',
    value: function handleNotifyIn(kitid) {
      var element = _reactUikitBase.helpers.getElement(kitid);
      (0, _velocityAnimate2.default)(element, { opacity: [1, 0.5], translateY: [0, -100] }, { display: 'block', duration: 200 });
    }
  }, {
    key: 'handleNotifyOut',
    value: function handleNotifyOut(kitid, onFade) {
      var _this3 = this;

      var element = _reactUikitBase.helpers.getElement(kitid);
      var timeout = 300;
      var index = this.state.messages.map(function (mes) {
        return mes.kitid;
      }).indexOf(kitid);

      if (this._reactInternalInstance) {
        (0, _velocityAnimate2.default)(element, { opacity: [0, 1], translateY: [-50, 0] }, { display: 'block', duration: timeout });

        setTimeout(function () {
          _this3.setState({
            messages: Array.from(new Set([].concat(_toConsumableArray(_this3.state.messages.slice(0, index)), _toConsumableArray(_this3.state.messages.slice(index + 1)))))
          }, onFade);
        }, timeout + 10);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var props = this.props;
      // CSS classes
      var cssClassNames = _reactUikitBase.helpers.cleanClasses(['uk-notify-message', props.context ? 'uk-notify-message-' + props.context : null]);

      // Remove non valid html attributes
      var ignoreProps = ['children', 'classes', 'onFade', 'context', 'kitid', 'message', 'status', 'timeout'];

      var cleanProps = _reactUikitBase.helpers.cleanProps(ignoreProps)(_extends({}, props, {
        timeout: null,
        message: null
      }));

      // set timeout
      if (props.timeout) {
        this.handleTimeout(props.timeout, props.kitid);
      }

      return _react2.default.createElement(
        'div',
        _extends({}, cleanProps, {
          'data-kitid': props.kitid ? props.kitid : '' + (0, _cuid2.default)(),
          className: cssClassNames
        }),
        _react2.default.createElement('a', { className: 'uk-close' }),
        props.message
      );
    }
  }]);

  return NotifyMessage;
}(_react2.default.Component);

NotifyMessage.propTypes = {
  children: _react2.default.PropTypes.any,
  classes: _react2.default.PropTypes.array,
  onFade: _react2.default.PropTypes.func,
  className: _react2.default.PropTypes.string,
  context: _react2.default.PropTypes.oneOf(['danger', 'info', 'success', 'warning']),
  kitid: _react2.default.PropTypes.string,
  message: _react2.default.PropTypes.any,
  onClick: _react2.default.PropTypes.func,
  timeout: _react2.default.PropTypes.number
};

var Notify = function Notify(props) {
  // CSS classes
  var cssClassNames = _reactUikitBase.helpers.cleanClasses(['uk-notify', props.classes, props.pos ? 'uk-notify-' + props.pos : null, props.className]);

  var items = props.messages.map(function (item, index) {
    var id = item.kitid || (0, _cuid2.default)();

    return _react2.default.createElement(NotifyMessage, {
      key: id,
      message: item.message,
      context: item.context,
      onFade: props.onFade,
      pos: item.pos,
      kitid: id,
      timeout: item.timeout,
      onClick: item.onClick
    });
  }).reverse();

  // Return Component
  return props.isOpened ? _react2.default.createElement(
    'div',
    {
      className: cssClassNames,
      'data-kitid': props.kitid
    },
    items
  ) : null;
};

Notify.propTypes = {
  children: _react2.default.PropTypes.any,
  isOpened: _react2.default.PropTypes.bool,
  onFade: _react2.default.PropTypes.func,
  classes: _react2.default.PropTypes.array,
  className: _react2.default.PropTypes.string,
  items: _react2.default.PropTypes.object,
  kitid: _react2.default.PropTypes.string,
  pos: _react2.default.PropTypes.oneOf(['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right']),
  messages: _react2.default.PropTypes.array
};

exports.default = (0, _reactUikitBase.base)(Notify);