'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reactInfiniteScrollComponent = require('react-infinite-scroll-component');

var _reactInfiniteScrollComponent2 = _interopRequireDefault(_reactInfiniteScrollComponent);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _bell = require('./_bell');

var _bell2 = _interopRequireDefault(_bell);

var _popOver = require('./_popOver');

var _popOver2 = _interopRequireDefault(_popOver);

var _Css = require('../spinner/Css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderItems(item) {
  return _react2.default.createElement(
    'div',
    { key: 'notification-' + item.id, className: (0, _classnames2.default)('notification', { bold: item.state === 'new' }) },
    _react2.default.createElement(
      'div',
      { className: 'notification-date' },
      (0, _moment2.default)(item.created_at).calendar()
    ),
    _react2.default.createElement('div', { className: 'notification-content', onClick: function onClick() {}, dangerouslySetInnerHTML: { __html: item.content } })
  );
}

var Container = function Container(_ref) {
  var isNotifToggled = _ref.isNotifToggled,
      onToggle = _ref.onToggle,
      onInfiniteLoad = _ref.onInfiniteLoad,
      items = _ref.items,
      isLoading = _ref.isLoading,
      scrollContainerId = _ref.scrollContainerId;
  return _react2.default.createElement(
    'div',
    { className: 'container-notification' },
    _react2.default.createElement(_bell2.default, { onClick: onToggle, size: 40 }),
    _react2.default.createElement(
      _popOver2.default,
      { isOpen: isNotifToggled, onClose: onToggle, scrollContainerId: scrollContainerId },
      _react2.default.createElement(
        _reactInfiniteScrollComponent2.default,
        {
          height: 350,
          next: onInfiniteLoad,
          scrollThreshold: 0.8,
          hasMore: !_lodash2.default.isNull(isLoading),
          endMessage: items.length ? 'No more notifications' : ' ',
          loader: _react2.default.createElement(_Css.CssSpinner, { type: 'rays' })
        },
        items.map(renderItems),
        items.length ? null : _react2.default.createElement(
          'div',
          { className: 'notification text-center', style: { borderBottomWidth: 0, margin: '50% 0' } },
          'You have no notifications for the moment'
        )
      )
    )
  );
};

exports.default = Container;