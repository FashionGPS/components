'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActionBar = function ActionBar(_ref) {
  var actions = _ref.actions,
      schema = _ref.schema;
  return _react2.default.createElement(
    'ul',
    { className: 'action-bar' },
    actions.map(function (action) {
      return _react2.default.createElement(
        'li',
        {
          key: action.key,
          className: (0, _classnames2.default)({ hidden: action.visibility }, 'action', action.key)
        },
        _react2.default.createElement(
          'span',
          { className: 'tooltipped tooltipped-n', 'aria-label': action.tooltipContent },
          _react2.default.createElement(
            'button',
            { className: 'btn', value: action.key, onClick: action.handle.bind(schema || null), 'aria-hidden': 'true' },
            _react2.default.createElement('i', { className: action.icon, value: action.key })
          )
        )
      );
    })
  );
};

ActionBar.propTypes = {
  actions: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    icon: _propTypes2.default.string,
    handle: _propTypes2.default.func,
    tooltipContent: _propTypes2.default.string,
    visibility: _propTypes2.default.bool
  })).isRequired
};

exports.default = ActionBar;