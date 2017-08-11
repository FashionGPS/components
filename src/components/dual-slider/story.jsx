import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { storiesOf, action } from '@storybook/react'
import DualSlider from './DualSlider'
import './DualSlider.scss'

storiesOf('Dual Slider')
  .add(
    'Module',
    withInfo()(() => (
      <div style={{ marginTop: 50, marginLeft: 50, width: 400 }}>
        <DualSlider
          onSliderUpdate={action('range')}
        />
      </div>
    )))
