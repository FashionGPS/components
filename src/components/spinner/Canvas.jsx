import React from 'react'
import { withInfo } from '@storybook/addon-info'

const STEP = 0.1
const ROTATION_STEP = (3 * Math.PI) / 180
const FULL_PI = 2 * Math.PI
const HALF_PI = 0.5 * Math.PI
const RADIUS_PERCENT = 0.8
const DEFAULT_SPINNER_COLOR = 'green'
const DEFAULT_SPINNER_WIDTH = 3
const DEFAULT_DIMENSIONS = 40

// upate values
let startAngle = 0
let endAngle = 0
let rotation = -HALF_PI
let moveStart = false
let radius = 15
let animate = false

// valid props -- checked later and defaulted here
let width = DEFAULT_DIMENSIONS
let height = DEFAULT_DIMENSIONS
let spinnerColor = DEFAULT_SPINNER_COLOR
let spinnerWidth = DEFAULT_SPINNER_WIDTH

export class CanvasSpinner extends React.PureComponent {

  static defaultProps = {
    width: DEFAULT_DIMENSIONS,
    height: DEFAULT_DIMENSIONS,
    spinnerColor: DEFAULT_SPINNER_COLOR,
    spinnerWidth: DEFAULT_SPINNER_WIDTH,
  }

  /**
   * Begin the animation, we want to offload logic for some variables
   * like the width, height, radius and other modifiable props.
   *
   */
  componentDidMount() {
    animate = true
    width = this.props.width
    height = this.props.height
    radius = Math.min(width / 2, height / 2) * RADIUS_PERCENT
    spinnerColor = this.props.spinnerColor
    spinnerWidth = this.props.spinnerWidth
    window.requestAnimationFrame(this.update.bind(this))
  }

  componentWillUnmount() {
    animate = false
  }
  /**
   * Our animation loop, once endAngle reaches the startAngle, move the startAngle
   * while at the same time incrementally adjust our rotation to have a fully
   * animated spinner effect.
   *
   */
  update() {
    const c = document.getElementById('spinner')
    if (!c) return

    const ctx = c.getContext('2d')
    ctx.clearRect(0, 0, width, height)

    if (!animate) return

    ctx.beginPath()

    ctx.arc(width / 2, height / 2, radius, rotation + startAngle, rotation + endAngle)
    ctx.strokeStyle = spinnerColor
    ctx.lineWidth = spinnerWidth
    ctx.stroke()

    rotation += ROTATION_STEP
    if (rotation >= FULL_PI) {
      rotation = 0
    }

    if (moveStart) {
      startAngle += STEP
    } else {
      endAngle += STEP
    }

    if (endAngle < startAngle) {
      moveStart = false
      endAngle = 0
      startAngle = 0
    } else if (endAngle >= FULL_PI) {
      moveStart = true
    }

    window.requestAnimationFrame(this.update.bind(this))
  }

  /**
   * If this component is going away, we don't want to keep registering for
   * animation keyframes and slow down everything else.
   *
   */

  render() {
    return (
      <canvas id="spinner" width={this.props.width} height={this.props.height}>
        Your browser does not support HTML5 canvas elements.
      </canvas>
    )
  }
}
