'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rheostat = require('rheostat');

var _rheostat2 = _interopRequireDefault(_rheostat);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AsyncButton = require('../button/AsyncButton');

var _AsyncButton2 = _interopRequireDefault(_AsyncButton);

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

var DualSlider = (_class = (_temp = _class2 = function (_React$PureComponent) {
  _inherits(DualSlider, _React$PureComponent);

  function DualSlider() {
    _classCallCheck(this, DualSlider);

    var _this = _possibleConstructorReturn(this, (DualSlider.__proto__ || Object.getPrototypeOf(DualSlider)).call(this));

    _this.state = {
      values: {}
    };
    return _this;
  }

  _createClass(DualSlider, [{
    key: 'handleClearAll',
    value: function handleClearAll() {
      this.props.onSliderUpdate({});
      this.setState({ values: {} });
    }
  }, {
    key: 'handleUpdate',
    value: function handleUpdate(_ref) {
      var values = _ref.values;

      var newState = { from: values[0], to: values[1] };
      this.props.onSliderUpdate(newState);
    }
  }, {
    key: 'updateNumbers',
    value: function updateNumbers() {
      this.setState({ values: {
          from: this.c.state.values[0],
          to: this.c.state.values[1]
        } });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          min = _props.min,
          max = _props.max,
          range = _props.range;
      var values = this.state.values;


      return _react2.default.createElement(
        'div',
        { className: 'slider-container' },
        _react2.default.createElement(
          'div',
          { className: 'left-number' },
          '' + (values.from || range.from || min)
        ),
        _react2.default.createElement(
          'div',
          { className: 'right-number' },
          '' + (values.to || range.to || max)
        ),
        _react2.default.createElement(_rheostat2.default, {
          ref: function ref(c) {
            _this2.c = c;
          },
          min: min,
          max: max,
          onChange: this.handleUpdate,
          onSliderDragMove: this.updateNumbers,
          values: [range.from || min, range.to || max]
        }),
        _react2.default.createElement(_AsyncButton2.default, { disabled: _lodash2.default.isEmpty(values), type: 'button', className: 'btn btn-secondary btn-sm', onClick: this.handleClearAll, title: 'Clear price' })
      );
    }
  }]);

  return DualSlider;
}(_react2.default.PureComponent), _class2.defaultProps = {
  min: 1,
  max: 100,
  range: {}
}, _class2.propTypes = {
  onSliderUpdate: _propTypes2.default.func.isRequired,
  range: _propTypes2.default.shape({
    from: _propTypes2.default.number,
    to: _propTypes2.default.number
  }).isRequired
}, _temp), (_applyDecoratedDescriptor(_class.prototype, 'handleClearAll', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleClearAll'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'handleUpdate', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'handleUpdate'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'updateNumbers', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, 'updateNumbers'), _class.prototype)), _class);
exports.default = DualSlider;