import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { storiesOf, action } from '@storybook/react'
import Alert from './Alert'
import Provider from '../../helpers/Provider'
import AsyncButton from '../button/AsyncButton'
import './Alert.scss'

storiesOf('Alert (toast)')
  .add(
    'Module',
    withInfo()(() => (
      <Provider
        mapWithState={({
          onAlertToggle,
          isAlertToggled,
        }) => <div style={{ marginTop: 350, marginLeft: '50%' }}>
          <AsyncButton title="Click me" onClick={onAlertToggle} />
          <Alert
            kitid="notify1"
            pos="top-center"
            onFade={onAlertToggle}
            isOpened={isAlertToggled}
            messages={[{
              message: 'Message...',
              kitid: 'message_0',
              timeout: 1000,
              context: 'info',
              onClick: action('clicked'),
            }]}
          />
        </div>}
      />
    )))
