import React from 'react'
import Rehostat from 'rheostat'
import _ from 'lodash'
import autobind from 'autobind-decorator'
import PropTypes from 'prop-types'
import AsyncButton from '../button/AsyncButton'

export default class DualSlider extends React.PureComponent {
  static defaultProps = {
    min: 1,
    max: 100,
    range: {},
  }

  static propTypes = {
    onSliderUpdate: PropTypes.func.isRequired,
    range: PropTypes.shape({
      from: PropTypes.number,
      to: PropTypes.number,
    }).isRequired,
  }

  constructor() {
    super()
    this.state = {
      values: {},
    }
  }

  @autobind
  handleClearAll() {
    this.props.onSliderUpdate({})
    this.setState({ values: {} })
  }

  @autobind
  handleUpdate({ values }) {
    const newState = { from: values[0], to: values[1] }
    this.props.onSliderUpdate(newState)
  }

  @autobind
  updateNumbers() {
    this.setState({ values: {
      from: this.c.state.values[0],
      to: this.c.state.values[1],
    } })
  }

  render() {
    const { min, max, range } = this.props
    const { values } = this.state

    return (
      <div className="slider-container">
        <div className="left-number" >{`${values.from || range.from || min}`}</div>
        <div className="right-number">{`${values.to || range.to || max}`}</div>
        <Rehostat
          ref={c => {
            this.c = c
          }}
          min={min}
          max={max}
          onChange={this.handleUpdate}
          onSliderDragMove={this.updateNumbers}
          values={[range.from || min, range.to || max]}
        />
        <AsyncButton disabled={_.isEmpty(values)} type="button" className="btn btn-secondary btn-sm" onClick={this.handleClearAll} title="Clear price" />
      </div>
    )
  }
}
