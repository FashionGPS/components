'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _react3 = require('@storybook/react');

var _DualSlider = require('./DualSlider');

var _DualSlider2 = _interopRequireDefault(_DualSlider);

require('./DualSlider.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Dual Slider').add('Module', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 50, marginLeft: 50, width: 400 } },
    _react2.default.createElement(_DualSlider2.default, {
      onSliderUpdate: (0, _react3.action)('range')
    })
  );
}));