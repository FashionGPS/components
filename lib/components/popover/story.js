'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _addonInfo = require('@storybook/addon-info');

var _react3 = require('@storybook/react');

var _Notification = require('./Notification');

var _Notification2 = _interopRequireDefault(_Notification);

var _Provider = require('../../helpers/Provider');

var _Provider2 = _interopRequireDefault(_Provider);

var _ZoomedImage = require('./ZoomedImage');

var _ZoomedImage2 = _interopRequireDefault(_ZoomedImage);

var _AvatarUploader = require('./AvatarUploader');

var _AvatarUploader2 = _interopRequireDefault(_AvatarUploader);

require('./Notification.scss');

require('./AvatarUploader.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react3.storiesOf)('Pop Over').add('Upload and crop your profile picture', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 100, marginLeft: '30%' } },
    _react2.default.createElement(_Provider2.default, {
      mapWithState: function mapWithState(_ref) {
        var isNotifToggled = _ref.isNotifToggled,
            onNotifToggle = _ref.onNotifToggle,
            onAvatarCrop = _ref.onAvatarCrop,
            croppedImage = _ref.croppedImage;
        return _react2.default.createElement(_AvatarUploader2.default, {
          defaultImage: 'https://www.mautic.org/media/images/default_avatar.png',
          width: 220,
          height: 220,
          croppedImage: croppedImage,
          isToggled: isNotifToggled,
          onToggle: onNotifToggle,
          onCrop: onAvatarCrop
        });
      }
    })
  );
})).add('Notification dropdown with infinite scrollable list', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(
    'div',
    { id: 'content', style: { marginTop: 50, marginLeft: '50%' } },
    _react2.default.createElement(_Provider2.default, {
      mapWithState: function mapWithState(_ref2) {
        var isLoading = _ref2.isLoading,
            isNotifToggled = _ref2.isNotifToggled,
            onNotifToggle = _ref2.onNotifToggle,
            onInfiniteLoad = _ref2.onInfiniteLoad,
            items = _ref2.items;
        return _react2.default.createElement(_Notification2.default, {
          key: 'notifications',
          isLoading: isLoading,
          isNotifToggled: isNotifToggled,
          onToggle: onNotifToggle,
          onInfiniteLoad: onInfiniteLoad,
          items: items,
          scrollContainerId: 'content'
        });
      }
    })
  );
})).add('FullImageMode', (0, _addonInfo.withInfo)()(function () {
  return _react2.default.createElement(
    'div',
    { style: { marginTop: 50 } },
    _react2.default.createElement(_Provider2.default, {
      mapWithState: function mapWithState(_ref3) {
        var onImageToggle = _ref3.onImageToggle,
            isImageToggled = _ref3.isImageToggled;
        return _react2.default.createElement(_ZoomedImage2.default, {
          image: 'http://carrementfleurs.com/wp/blog/wp-content/uploads/sites/2/2015/08/tournesol-1.jpg',
          width: 1920,
          height: 1200,
          isOpen: isImageToggled,
          onToggle: onImageToggle
        });
      }
    })
  );
}));