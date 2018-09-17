'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bell = function Bell(_ref) {
  var onClick = _ref.onClick,
      size = _ref.size;

  return _react2.default.createElement(
    'button',
    { type: 'button', className: 'dropdown_toggle', onClick: onClick },
    _react2.default.createElement(
      'div',
      { className: 'dropdown_icon' },
      _react2.default.createElement(
        'svg',
        { key: 'bell', className: 'bell', width: '100%', height: size, viewBox: '0 0 24 24', xmlns: 'http://www.w3.org/2000/svg' },
        _react2.default.createElement('path', {
          d: 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z'
        })
      )
    )
  );
};

Bell.defaultProps = {
  size: 40
};

Bell.propTypes = {
  onClick: _propTypes2.default.func.isRequired,
  size: _propTypes2.default.number
};

exports.default = Bell;