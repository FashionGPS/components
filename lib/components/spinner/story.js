'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _react3 = require('@storybook/react');

var _Canvas = require('./Canvas');

var _Css = require('./Css');

require('./Spinner.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Spinners').add('Spinner inside a canvas with no css dependencies', function () {
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 50, marginLeft: 50 } },
    _react2.default.createElement(_Canvas.CanvasSpinner, { width: 30, height: 30, spinnerColor: 'green', spinnerWidth: 3 })
  );
}, { propTables: [_Canvas.CanvasSpinner] }).add('Spinner with css3 animation', function () {
  return _react2.default.createElement(
    'form',
    null,
    _react2.default.createElement(
      'h2',
      null,
      'Bounce'
    ),
    _react2.default.createElement(
      'div',
      { role: 'group' },
      _react2.default.createElement(_Css.CssSpinner, { type: 'bounce' })
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Rays'
    ),
    _react2.default.createElement(
      'div',
      { role: 'group' },
      _react2.default.createElement(_Css.CssSpinner, { type: 'rays' })
    )
  );
}, { propTables: [_Css.CssSpinner] });