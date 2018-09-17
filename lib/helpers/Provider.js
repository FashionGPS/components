'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var items = [{
  id: '58b6f31c9f4ee8a6613b1a71',
  content: 'asdf has been added to your profile list. <a href="/brand/58b6f31c9f4ee8a6613b1a70">Show</a>',
  state: 'new',
  created_at: '2017-03-01T16:13:16.425Z'
}, {
  id: '58ad61c49f4ee87905538665',
  content: 'asdf has been added to your profile list. <a href="/brand/58ad61c49f4ee87905538664">Show</a>',
  state: 'new',
  created_at: '2017-02-22T10:02:44.322Z'
}, {
  id: '58ad61329f4ee87905538653',
  content: 'asdf has been added to your profile list. <a href="/brand/58ad61329f4ee87905538652">Show</a>',
  state: 'new',
  created_at: '2017-02-22T10:00:18.105Z'
}, {
  id: '58ad60d19f4ee8790653863d',
  content: 'mr six has been added to your profile list. <a href="/brand/58ad60d19f4ee8790653863c">Show</a>',
  state: 'new',
  created_at: '2017-02-22T09:58:41.507Z'
}, {
  id: '58ad60a19f4ee87906538635',
  content: 'Marcia West has been added to your profile list. <a href="/brand/578c9b159f4ee8be4ba3e3a1">Show</a>',
  state: 'new',
  created_at: '2017-02-22T09:57:53.202Z'
}, {
  id: '58944de39f4ee8291807a615',
  content: 'kjansdf has been added to your profile list. <a href="http://localhost/brand/58944de39f4ee8291807a614">Show</a>',
  state: 'new',
  created_at: '2017-02-03T09:31:15.296Z'
}, {
  id: '588628619f4ee80bc8050697',
  content: 'ASDFASDf has been added to your profile list. <a href="http://localhost/brand/588628619f4ee80bc8050696">Show</a>',
  state: 'read',
  created_at: '2017-01-23T15:59:29.577Z'
}];

var Provider = (_temp = _class = function (_React$Component) {
  _inherits(Provider, _React$Component);

  function Provider() {
    _classCallCheck(this, Provider);

    var _this = _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this));

    _this.state = {
      isNotifToggled: false,
      isAvatarToggled: false,
      isImageToggled: false,
      isAlertToggled: false,
      isLoading: false,
      onNotifToggle: _this.onNotifToggle.bind(_this),
      onAvatarToggle: _this.onAvatarToggle.bind(_this),
      onImageToggle: _this.onImageToggle.bind(_this),
      onAvatarCrop: _this.onAvatarCrop.bind(_this),
      onInfiniteLoad: _this.onInfiniteLoad.bind(_this),
      onAlertToggle: _this.onAlertToggle.bind(_this),
      croppedImage: null,
      items: items
    };
    return _this;
  }

  _createClass(Provider, [{
    key: 'onNotifToggle',
    value: function onNotifToggle() {
      this.setState({ isNotifToggled: !this.state.isNotifToggled });
    }
  }, {
    key: 'onImageToggle',
    value: function onImageToggle() {
      this.setState({ isImageToggled: !this.state.isImageToggled });
    }
  }, {
    key: 'onAlertToggle',
    value: function onAlertToggle() {
      this.setState({ isAlertToggled: !this.state.isAlertToggled });
    }
  }, {
    key: 'onAvatarToggle',
    value: function onAvatarToggle(options) {
      this.setState(Object.assign({ iAvatarToggled: !this.state.iAvatarToggled }, options && options.reset ? { croppedImage: null } : {}));
    }
  }, {
    key: 'onAvatarCrop',
    value: function onAvatarCrop(croppedImage) {
      this.setState({ croppedImage: croppedImage });
    }
  }, {
    key: 'onInfiniteLoad',
    value: function onInfiniteLoad() {
      this.setState({ isLoading: !this.state.isLoading });
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.mapWithState(this.state, this.props);
    }
  }]);

  return Provider;
}(_react2.default.Component), _class.propTypes = {
  mapWithState: _propTypes2.default.func.isRequired
}, _temp);
exports.default = Provider;