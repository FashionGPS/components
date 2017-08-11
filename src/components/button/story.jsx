import React from 'react'
import { withInfo } from '@storybook/addon-info'
import _ from 'lodash'
import { storiesOf, action } from '@storybook/react'
import AsyncButton from './AsyncButton'
import './AsyncButton.scss'

const bellIcon = (<svg className="bell" width="100%" height={40} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
</svg>)

let successButton
let spinningButton

storiesOf('Buttons')
  .add(
    'Basic set',
    withInfo()(() => (
      <form>
        <h2>Default</h2>
        <div role="group">
          <AsyncButton title="Primary" onClick={action('clicked')} kind="primary" align="left" icon={bellIcon} />
        </div>
        <h2>Secondary</h2>
        <div role="group">
          <AsyncButton title="Secondary" onClick={action('clicked')} kind="secondary" align="left" icon={bellIcon} />
        </div>
        <h2>Success</h2>
        <div role="group">
          <AsyncButton
            title="Click me!" width={200} ref={el => { successButton = el }} onClick={e => {
              e.preventDefault()
              successButton.success()
            }} icon={bellIcon}
          />
        </div>
        <h2>Spinning</h2>
        <div role="group">
          <AsyncButton
            title="Click me!" ref={el => { spinningButton = el }} onClick={e => {
              e.preventDefault()
              spinningButton.isSending(true)
              _.delay(() => {
                spinningButton.isSending(false)
              }, 2000)
            }} icon={bellIcon}
          />
        </div>
      </form>
    )))
