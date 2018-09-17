'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _sidebar = require('./_sidebar');

var _sidebar2 = _interopRequireDefault(_sidebar);

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

var DOCKED_THRESHOLD_SIDEBAR = 800;

var OffCanvas = (_class = function (_React$Component) {
  _inherits(OffCanvas, _React$Component);

  function OffCanvas() {
    _classCallCheck(this, OffCanvas);

    var _this = _possibleConstructorReturn(this, (OffCanvas.__proto__ || Object.getPrototypeOf(OffCanvas)).call(this));

    _this.state = {
      mql: null,
      isSideBarOpen: false,
      isSideBarDocked: false
    };
    return _this;
  }

  _createClass(OffCanvas, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var mql = window.matchMedia('(min-width: ' + DOCKED_THRESHOLD_SIDEBAR + 'px)');
      mql.addListener(this.mediaQueryChanged);
      this.setState({ mql: mql });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.mediaQueryChanged();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.state.mql.removeListener(this.mediaQueryChanged);
    }
  }, {
    key: 'onSetOpen',
    value: function onSetOpen(isSideBarOpen) {
      this.setState({ isSideBarOpen: isSideBarOpen });
    }
  }, {
    key: 'mediaQueryChanged',
    value: function mediaQueryChanged() {
      if (this.state.mql) this.setState({ isSideBarDocked: this.state.mql.matches });
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          isSideBarOpen = _state.isSideBarOpen,
          isSideBarDocked = _state.isSideBarDocked;


      return _react2.default.createElement(
        _sidebar2.default,
        {
          sidebarClassName: 'sidebar',
          sidebar: _react2.default.createElement(
            'div',
            { style: { backgroundColor: 'red', height: '100%', width: 298 } },
            'hello'
          ),
          shadow: false,
          sidebarWidth: 298,
          open: isSideBarOpen,
          docked: isSideBarDocked,
          onSetOpen: this.onSetOpen
        },
        _react2.default.createElement(
          'div',
          { style: { backgroundColor: 'green', height: '100%', color: 'white' } },
          'try to resize me down !'
        )
      );
    }
  }]);

  return OffCanvas;
}(_react2.default.Component), (_applyDecoratedDescriptor(_class.prototype, 'onSetOpen', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'onSetOpen'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'mediaQueryChanged', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'mediaQueryChanged'), _class.prototype)), _class);
exports.default = OffCanvas;