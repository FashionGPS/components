import React from 'react'
import { withInfo } from '@storybook/addon-info'
import { storiesOf } from '@storybook/react'
import { CanvasSpinner } from './Canvas'
import { CssSpinner } from './Css'
import './_Css.scss'

storiesOf('Spinners')
  .add(
    'Spinner inside a canvas with no css dependencies',
    () => (
      <div style={{ marginTop: 50, marginLeft: 50 }}>
        <CanvasSpinner width={30} height={30} spinnerColor="green" spinnerWidth={3} />
      </div>
    ),
    { propTables: [CanvasSpinner] },
  )
  .add(
    'Spinner with css3 animation',
    () => (
      <form>
        <h2>Bounce</h2>
        <div role="group">
          <CssSpinner type="bounce" />
        </div>
        <h2>Rays</h2>
        <div role="group">
          <CssSpinner type="rays" />
        </div>
      </form>
    ),
    { propTables: [CssSpinner] },
  )
