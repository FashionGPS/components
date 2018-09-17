'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _react3 = require('@storybook/react');

var _OffCanvas = require('./OffCanvas');

var _OffCanvas2 = _interopRequireDefault(_OffCanvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Off Canvas').add('Side bar menu with auto docking', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(_OffCanvas2.default, null);
}));