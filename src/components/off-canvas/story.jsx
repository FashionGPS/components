import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import OffCanvas from './OffCanvas'

storiesOf('Off Canvas')
  .add(
    'Side bar menu with auto docking',
    withInfo()(() => (
      <OffCanvas />
    )))
