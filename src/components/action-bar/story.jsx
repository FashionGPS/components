import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { storiesOf, action } from '@storybook/react'
import ActionBar from './ActionBar'
import './ActionBar.scss'

const actions = [
  { key: 'move-up', icon: 'typicons-up', handle: action('movePersonUp'), tooltipContent: 'Move up', hidden: false },
  { key: 'move-down', icon: 'typicons-down', handle: action('movePersonDown'), tooltipContent: 'Move down', hidden: false },
  { key: 'delete', icon: 'typicons-delete', handle: action('deletePerson'), tooltipContent: 'Delete', hidden: false },
  { key: 'edit', icon: 'typicons-edit', handle: action('editPerson'), tooltipContent: 'Edit', hidden: false },
]

storiesOf('Bar of actions with tooltips')
  .add(
    'Module',
    withInfo()(() => (
      <div style={{ marginTop: 50 }}>
        <ActionBar actions={actions} schema={undefined} />
      </div>
    )))
