'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasSpinner = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STEP = 0.1;
var ROTATION_STEP = 3 * Math.PI / 180;
var FULL_PI = 2 * Math.PI;
var HALF_PI = 0.5 * Math.PI;
var RADIUS_PERCENT = 0.8;
var DEFAULT_SPINNER_COLOR = 'green';
var DEFAULT_SPINNER_WIDTH = 3;
var DEFAULT_DIMENSIONS = 40;

// upate values
var startAngle = 0;
var endAngle = 0;
var rotation = -HALF_PI;
var moveStart = false;
var radius = 15;
var animate = false;

// valid props -- checked later and defaulted here
var width = DEFAULT_DIMENSIONS;
var height = DEFAULT_DIMENSIONS;
var spinnerColor = DEFAULT_SPINNER_COLOR;
var spinnerWidth = DEFAULT_SPINNER_WIDTH;

var CanvasSpinner = exports.CanvasSpinner = (_temp = _class = function (_React$PureComponent) {
  _inherits(CanvasSpinner, _React$PureComponent);

  function CanvasSpinner() {
    _classCallCheck(this, CanvasSpinner);

    return _possibleConstructorReturn(this, (CanvasSpinner.__proto__ || Object.getPrototypeOf(CanvasSpinner)).apply(this, arguments));
  }

  _createClass(CanvasSpinner, [{
    key: 'componentDidMount',


    /**
     * Begin the animation, we want to offload logic for some variables
     * like the width, height, radius and other modifiable props.
     *
     */
    value: function componentDidMount() {
      animate = true;
      width = this.props.width;
      height = this.props.height;
      radius = Math.min(width / 2, height / 2) * RADIUS_PERCENT;
      spinnerColor = this.props.spinnerColor;
      spinnerWidth = this.props.spinnerWidth;
      window.requestAnimationFrame(this.update.bind(this));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      animate = false;
    }
    /**
     * Our animation loop, once endAngle reaches the startAngle, move the startAngle
     * while at the same time incrementally adjust our rotation to have a fully
     * animated spinner effect.
     *
     */

  }, {
    key: 'update',
    value: function update() {
      var c = document.getElementById('spinner');
      if (!c) return;

      var ctx = c.getContext('2d');
      ctx.clearRect(0, 0, width, height);

      if (!animate) return;

      ctx.beginPath();

      ctx.arc(width / 2, height / 2, radius, rotation + startAngle, rotation + endAngle);
      ctx.strokeStyle = spinnerColor;
      ctx.lineWidth = spinnerWidth;
      ctx.stroke();

      rotation += ROTATION_STEP;
      if (rotation >= FULL_PI) {
        rotation = 0;
      }

      if (moveStart) {
        startAngle += STEP;
      } else {
        endAngle += STEP;
      }

      if (endAngle < startAngle) {
        moveStart = false;
        endAngle = 0;
        startAngle = 0;
      } else if (endAngle >= FULL_PI) {
        moveStart = true;
      }

      window.requestAnimationFrame(this.update.bind(this));
    }

    /**
     * If this component is going away, we don't want to keep registering for
     * animation keyframes and slow down everything else.
     *
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'canvas',
        { id: 'spinner', width: this.props.width, height: this.props.height },
        'Your browser does not support HTML5 canvas elements.'
      );
    }
  }]);

  return CanvasSpinner;
}(_react2.default.PureComponent), _class.defaultProps = {
  width: DEFAULT_DIMENSIONS,
  height: DEFAULT_DIMENSIONS,
  spinnerColor: DEFAULT_SPINNER_COLOR,
  spinnerWidth: DEFAULT_SPINNER_WIDTH }, _temp);