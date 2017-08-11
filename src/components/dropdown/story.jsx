import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { storiesOf, action } from '@storybook/react'
import Dropdown from './Dropdown'
import './Dropdown.scss'

const options = [
  { index: '1', title: 'Test external URL', href: 'http://www.google.com' },
  { index: '2', title: 'Test 2', onClick: action('clicked') },
  { index: '3', title: 'Test 3', onClick: action('clicked') },
]

storiesOf('Dropdown')
  .add(
    'Module',
    withInfo()(() => (
      <div style={{ marginTop: 50 }}>
        <Dropdown options={options} />
      </div>
    )))
