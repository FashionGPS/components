'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _scroll = require('scroll');

var _scroll2 = _interopRequireDefault(_scroll);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _easeComponent = require('ease-component');

var _easeComponent2 = _interopRequireDefault(_easeComponent);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _portal = require('./_portal');

var _portal2 = _interopRequireDefault(_portal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopOver = (_temp = _class = function (_React$Component) {
  _inherits(PopOver, _React$Component);

  function PopOver() {
    _classCallCheck(this, PopOver);

    var _this = _possibleConstructorReturn(this, (PopOver.__proto__ || Object.getPrototypeOf(PopOver)).call(this));

    _this.setRootElement = function (element) {
      _this._rootElement = element;
    };

    _this.setPortalModalElement = function (element) {
      _this._portalModalElement = element;
    };

    _this.setArrowElement = function (element) {
      _this._arrowElement = element;
    };

    _this.handleKeyDown = function (event) {
      if (event.key === 'Escape') {
        _this.handleClose();
      }
    };

    _this.handleBackdropClick = function (event) {
      _this.handleClose();
      event.stopPropagation();
      event.preventDefault();
    };

    _this.renderPortal = function (scrollContainer) {
      var _this$props = _this.props,
          title = _this$props.title,
          children = _this$props.children,
          isCreatingNewItem = _this$props.isCreatingNewItem;

      var rootElement = _this._rootElement;
      var rootRects = rootElement.getBoundingClientRect();
      var top = rootRects.top,
          left = rootRects.left;
      var scrollTop = scrollContainer.scrollTop;


      var windowWidth = window.innerWidth;
      var modalTop = top + scrollTop;
      var modalRight = windowWidth - left - 80;

      return _react2.default.createElement(
        _portal2.default,
        {
          isOpen: true,
          scrollContainer: scrollContainer,
          onOpen: _this.addResizeListener,
          className: 'portal'
        },
        _react2.default.createElement(
          'div',
          { className: 'overlay', onClick: _this.handleBackdropClick },
          _react2.default.createElement(
            'div',
            {
              className: 'portalModal',
              ref: _this.setPortalModalElement,
              onClick: _this.handleClose,
              style: {
                position: 'absolute',
                top: modalTop + 'px',
                right: modalRight + 'px'
              }
            },
            _react2.default.createElement('div', { className: 'arrow', ref: _this.setArrowElement }),
            title ? _react2.default.createElement(
              'div',
              { className: 'head' },
              _react2.default.createElement(
                'h3',
                { className: 'title' },
                isCreatingNewItem && 'New ',
                title
              )
            ) : null,
            _react2.default.createElement(
              'div',
              { className: 'content' },
              children
            )
          )
        )
      );
    };

    _this.handleClose = _this.handleClose.bind(_this);
    _this.handleResize = _lodash2.default.debounce(_this.repositionElement.bind(_this), 17); // 60fps
    _this.resetPosition = _this.resetPosition.bind(_this);
    _this.scrollOptions = {
      duration: 250,
      ease: _easeComponent2.default.easeInOutQuart
    };
    _this.state = {
      scrollContainer: null
    };
    return _this;
  }

  _createClass(PopOver, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this.setState({
        scrollContainer: this.props.scrollContainerId ? document.getElementById(this.props.scrollContainerId) : document.body.firstChild.nextSibling
      });
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.state.scrollContainer && this.initialScrollTop) {
        _scroll2.default.top(this.state.scrollContainer, this.initialScrollTop, this.scrollOptions);
      }
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'handleClose',
    value: function handleClose() {
      if (this.state.scrollContainer) {
        _scroll2.default.top(this.state.scrollContainer, this.initialScrollTop, this.scrollOptions);
      }
      this.props.onClose();
    }
  }, {
    key: 'repositionElement',
    value: function repositionElement() {
      var rootElement = this._rootElement;
      var portalModalElement = this._portalModalElement;

      if (!rootElement || !portalModalElement) {
        return;
      }

      var rootRects = rootElement.getBoundingClientRect();
      var portalModalRects = portalModalElement.getBoundingClientRect();
      var scrollTop = this.state.scrollContainer.scrollTop;
      var height = portalModalRects.height;
      var top = rootRects.top,
          right = rootRects.right;

      // we can use window since we don't support horizontal scrolling
      // and the backdrop is fixed

      var containerOffsetHeight = this.state.scrollContainer.offsetHeight;

      var padding = 30;

      // Scroll container when there is no space
      if (containerOffsetHeight < top + height) {
        var newScrollTop = (containerOffsetHeight - top - height - scrollTop - padding) * -1;

        // If element is to big for screen, scroll top only top of the element
        if (height > containerOffsetHeight) {
          newScrollTop = top + scrollTop - padding * 3;
        }

        _scroll2.default.top(this.state.scrollContainer, newScrollTop, this.scrollOptions);
      }

      // Need more bottom space
      if (this.state.scrollContainer.scrollHeight < scrollTop + top + height) {
        var extraPaddingBottom = Math.abs(this.state.scrollContainer.scrollHeight - scrollTop - height - top);
        this.state.scrollContainer.style.paddingBottom = extraPaddingBottom + 'px';
        var _newScrollTop = (containerOffsetHeight - top - height - scrollTop) * -1;

        // If element is to big for screen, scroll top only top of the element
        if (height > containerOffsetHeight) {
          _newScrollTop = top + scrollTop - padding * 3;
        }
        _scroll2.default.top(this.state.scrollContainer, _newScrollTop, this.scrollOptions);
      }

      var windowWidth = window.innerWidth;
      this._portalModalElement.style.right = windowWidth - right;
    }
  }, {
    key: 'resetPosition',
    value: function resetPosition() {
      this._portalModalElement.style.right = '150';
      this._arrowElement.style.transform = 'translateX(0px)';
    }
  }, {
    key: 'addResizeListener',
    value: function addResizeListener() {
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('keydown', this.handleKeyDown);
    }
  }, {
    key: 'render',
    value: function render() {
      var isOpen = this.props.isOpen;

      return _react2.default.createElement(
        'div',
        { ref: this.setRootElement },
        this.state.scrollContainer && isOpen && this.renderPortal(this.state.scrollContainer)
      );
    }
  }]);

  return PopOver;
}(_react2.default.Component), _class.propTypes = {
  title: _propTypes2.default.string,
  children: _propTypes2.default.node.isRequired,
  onClose: _propTypes2.default.func,
  isCreatingNewItem: _propTypes2.default.bool,
  scrollContainerId: _propTypes2.default.string,
  isOpen: _propTypes2.default.bool
}, _class.defaultProps = {
  onClose: function onClose() {},
  // eslint-disable-line
  actions: [],
  isOpen: true
}, _temp);
exports.default = PopOver;