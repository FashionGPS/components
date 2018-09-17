'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _react3 = require('@storybook/react');

var _reactFlexCarousel = require('react-flex-carousel');

var _reactFlexCarousel2 = _interopRequireDefault(_reactFlexCarousel);

require('./Carousel.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Responsive carousel').add('Module', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 50 } },
    _react2.default.createElement(
      _reactFlexCarousel2.default,
      { autoplayInteval: false, indicator: true, switcher: true },
      _react2.default.createElement(
        'a',
        { href: '#', style: { backgroundImage: 'url(http://placekitten.com/1000/700)' } },
        _react2.default.createElement(
          'div',
          { className: 'overlay' },
          'Little cute cat 1'
        )
      ),
      _react2.default.createElement(
        'a',
        { href: '#', style: { backgroundImage: 'url(http://placekitten.com/1000/700)' } },
        _react2.default.createElement(
          'div',
          { className: 'overlay' },
          'Little cute cat 2'
        )
      ),
      _react2.default.createElement(
        'a',
        { href: '#', style: { backgroundImage: 'url(http://placekitten.com/1000/700)' } },
        _react2.default.createElement(
          'div',
          { className: 'overlay' },
          'Little cute cat 3'
        )
      ),
      _react2.default.createElement(
        'a',
        { href: '#', style: { backgroundImage: 'url(http://placekitten.com/1000/700)' } },
        _react2.default.createElement(
          'div',
          { className: 'overlay' },
          'Little cute cat 4'
        )
      ),
      _react2.default.createElement(
        'a',
        { href: '#', style: { backgroundImage: 'url(http://placekitten.com/1000/700)' } },
        _react2.default.createElement(
          'div',
          { className: 'overlay' },
          'Little cute cat 5'
        )
      ),
      _react2.default.createElement(
        'a',
        { href: '#', style: { backgroundImage: 'url(http://placekitten.com/1000/700)' } },
        _react2.default.createElement(
          'div',
          { className: 'overlay' },
          'Little cute cat 6'
        )
      )
    )
  );
}));