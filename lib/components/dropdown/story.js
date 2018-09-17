'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _react3 = require('@storybook/react');

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

require('./Dropdown.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = [{ index: '1', title: 'Test external URL', href: 'http://www.google.com' }, { index: '2', title: 'Test 2', onClick: (0, _react3.action)('clicked') }, { index: '3', title: 'Test 3', onClick: (0, _react3.action)('clicked') }];

(0, _react3.storiesOf)('Dropdown').add('Module', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 50 } },
    _react2.default.createElement(_Dropdown2.default, { options: options })
  );
}));