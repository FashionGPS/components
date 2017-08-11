import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import Notification from './Notification'
import Provider from '../../helpers/Provider'
import ZoomedImage from './ZoomedImage'
import AvatarUploader from './AvatarUploader'
import './Notification.scss'
import './AvatarUploader.scss'

storiesOf('Pop Over')
  .add(
    'Upload and crop your profile picture',
    withInfo()(() => (
      <div style={{ marginTop: 100, marginLeft: '30%' }}>
        <Provider
          mapWithState={({
            isNotifToggled,
            onNotifToggle,
            onAvatarCrop,
            croppedImage,
          }) => <AvatarUploader
            defaultImage="https://www.mautic.org/media/images/default_avatar.png"
            width={220}
            height={220}
            croppedImage={croppedImage}
            isToggled={isNotifToggled}
            onToggle={onNotifToggle}
            onCrop={onAvatarCrop}
          />}
        />
      </div>
    )))
  .add(
    'Notification dropdown with infinite scrollable list',
    withInfo()(() => (
      <div id="content" style={{ marginTop: 50, marginLeft: '50%' }}>
        <Provider
          mapWithState={({
            isLoading,
            isNotifToggled,
            onNotifToggle,
            onInfiniteLoad,
            items,
          }) => <Notification
            key="notifications"
            isLoading={isLoading}
            isNotifToggled={isNotifToggled}
            onToggle={onNotifToggle}
            onInfiniteLoad={onInfiniteLoad}
            items={items}
            scrollContainerId="content"
          />}
        />
      </div>
    )))
  .add(
    'FullImageMode',
    withInfo()(() => (
      <div style={{ marginTop: 50 }}>
        <Provider
          mapWithState={({
            onImageToggle,
            isImageToggled,
          }) => <ZoomedImage
            image="http://carrementfleurs.com/wp/blog/wp-content/uploads/sites/2/2015/08/tournesol-1.jpg"
            width={1920}
            height={1200}
            isOpen={isImageToggled}
            onToggle={onImageToggle}
          />}
        />
      </div>
    )))
