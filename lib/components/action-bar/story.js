'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _react3 = require('@storybook/react');

var _ActionBar = require('./ActionBar');

var _ActionBar2 = _interopRequireDefault(_ActionBar);

require('./ActionBar.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var actions = [{ key: 'move-up', icon: 'typicons-up', handle: (0, _react3.action)('movePersonUp'), tooltipContent: 'Move up', hidden: false }, { key: 'move-down', icon: 'typicons-down', handle: (0, _react3.action)('movePersonDown'), tooltipContent: 'Move down', hidden: false }, { key: 'delete', icon: 'typicons-delete', handle: (0, _react3.action)('deletePerson'), tooltipContent: 'Delete', hidden: false }, { key: 'edit', icon: 'typicons-edit', handle: (0, _react3.action)('editPerson'), tooltipContent: 'Edit', hidden: false }];

(0, _react3.storiesOf)('Bar of actions with tooltips').add('Module', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 50 } },
    _react2.default.createElement(_ActionBar2.default, { actions: actions, schema: undefined })
  );
}));