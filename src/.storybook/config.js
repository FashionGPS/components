import React from 'react'
import JSXAddon from 'storybook-addon-jsx'
import { configure, addDecorator, setAddon } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import themeLight from '../themes/light'

require('../helpers/reboot.css')

setAddon(JSXAddon)

addDecorator(withKnobs)

const theme = {
  primary: '#7ec165',
  secondary: '#fe761f'
}

const withTheme = storyFn =>
  <div>
    <link href='https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i' rel='stylesheet' />
    <link href='https://fonts.googleapis.com/icon?family=Material+Icons' rel='stylesheet' />
    <style dangerouslySetInnerHTML={{__html: themeLight(theme)}} />
    {storyFn()}
  </div>

addDecorator(withTheme)

function loadStories () {
  require('../components/action-bar/story')
  require('../components/alert/story')
  require('../components/button/story')
  require('../components/carousel/story')
  require('../components/dropdown/story')
  require('../components/dual-slider/story')
  require('../components/off-canvas/story')
  require('../components/popover/story')
  require('../components/spinner/story')
}

configure(loadStories, module)
