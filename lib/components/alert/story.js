'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _react3 = require('@storybook/react');

var _Alert = require('./Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Provider = require('../../helpers/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _AsyncButton = require('../button/AsyncButton');

var _AsyncButton2 = _interopRequireDefault(_AsyncButton);

require('./Alert.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Alert (toast)').add('Module', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(_Provider2.default, {
    mapWithState: function mapWithState(_ref) {
      var onAlertToggle = _ref.onAlertToggle,
          isAlertToggled = _ref.isAlertToggled;
      return _react2.default.createElement(
        'div',
        { style: { marginTop: 350, marginLeft: '50%' } },
        _react2.default.createElement(_AsyncButton2.default, { title: 'Click me', onClick: onAlertToggle }),
        _react2.default.createElement(_Alert2.default, {
          kitid: 'notify1',
          pos: 'top-center',
          onFade: onAlertToggle,
          isOpened: isAlertToggled,
          messages: [{
            message: 'Message...',
            kitid: 'message_0',
            timeout: 1000,
            context: 'info',
            onClick: (0, _react3.action)('clicked')
          }]
        })
      );
    }
  });
}));