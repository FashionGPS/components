'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _react3 = require('@storybook/react');

var _AsyncButton = require('./AsyncButton');

var _AsyncButton2 = _interopRequireDefault(_AsyncButton);

require('./AsyncButton.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bellIcon = _react2.default.createElement(
  'svg',
  { className: 'bell', width: '100%', height: 40, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
  _react2.default.createElement('path', { d: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z' })
);

var successButton = void 0;
var spinningButton = void 0;

(0, _react3.storiesOf)('Buttons').add('Basic set', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(
    'form',
    null,
    _react2.default.createElement(
      'h2',
      null,
      'Default'
    ),
    _react2.default.createElement(
      'div',
      { role: 'group' },
      _react2.default.createElement(_AsyncButton2.default, { title: 'Primary', onClick: (0, _react3.action)('clicked'), kind: 'primary', align: 'left', icon: bellIcon })
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Secondary'
    ),
    _react2.default.createElement(
      'div',
      { role: 'group' },
      _react2.default.createElement(_AsyncButton2.default, { title: 'Secondary', onClick: (0, _react3.action)('clicked'), kind: 'secondary', align: 'left', icon: bellIcon })
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Success'
    ),
    _react2.default.createElement(
      'div',
      { role: 'group' },
      _react2.default.createElement(_AsyncButton2.default, {
        title: 'Click me!', width: 200, ref: function ref(el) {
          successButton = el;
        }, onClick: function onClick(e) {
          e.preventDefault();
          successButton.success();
        }, icon: bellIcon
      })
    ),
    _react2.default.createElement(
      'h2',
      null,
      'Spinning'
    ),
    _react2.default.createElement(
      'div',
      { role: 'group' },
      _react2.default.createElement(_AsyncButton2.default, {
        title: 'Click me!', ref: function ref(el) {
          spinningButton = el;
        }, onClick: function onClick(e) {
          e.preventDefault();
          spinningButton.isSending(true);
          _lodash2.default.delay(function () {
            spinningButton.isSending(false);
          }, 2000);
        }, icon: bellIcon
      })
    )
  );
}));