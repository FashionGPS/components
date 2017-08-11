import React from 'react'
import {
  base,
  helpers,
} from 'react-uikit-base'
import cuid from 'cuid'
import velocity from 'velocity-animate'

class NotifyMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
  }

  componentDidMount () {
    this.handleNotifyIn(this.props.kitid)
  }


  handleClick (e) {
    this.props.onClick(e, this.props.kitid)
  }

  handleTimeout (duration, kitid) {
    if (duration) {
      setTimeout(() => {
        this.handleNotifyOut(this.props.kitid, this.props.onFade)
      }, duration)
    }
  }

  handleNotifyIn(kitid) {
    const element = helpers.getElement(kitid)
    velocity(
      element,
      { opacity: [1, 0.5], translateY: [0, -100] },
      { display: 'block', duration: 200 }
    )
  }


  handleNotifyOut(kitid, onFade) {
    const element = helpers.getElement(kitid)
    const timeout = 300
    const index = this.state.messages.map(mes => mes.kitid).indexOf(kitid)

    if (this._reactInternalInstance) {
      velocity(
        element,
        { opacity: [0, 1], translateY: [-50, 0] },
        { display: 'block', duration: timeout }
      )

      setTimeout(() => {
        this.setState({
          messages:  Array.from(new Set([
            ...this.state.messages.slice(0, index),
            ...this.state.messages.slice(index + 1)
          ]))
        }, onFade)
      }, timeout + 10)
    }
  }

  render () {
    const props = this.props
    // CSS classes
    const cssClassNames =  helpers.cleanClasses([
      'uk-notify-message',
      props.context ? `uk-notify-message-${props.context}` : null
    ])

    // Remove non valid html attributes
    const ignoreProps = [
      'children',
      'classes',
      'onFade',
      'context',
      'kitid',
      'message',
      'status',
      'timeout'
    ]

    const cleanProps = helpers.cleanProps(ignoreProps)({
      ...props,
      timeout: null,
      message: null
    })

    // set timeout
    if (props.timeout) {
      this.handleTimeout(props.timeout, props.kitid)
    }

    return <div
      {...cleanProps}
      data-kitid={props.kitid ? props.kitid :  `${cuid()}`}
      className={cssClassNames}
    >
    <a className="uk-close"></a>
      {props.message}
    </div>
  }
}

NotifyMessage.propTypes = {
  children  : React.PropTypes.any,
  classes   : React.PropTypes.array,
  onFade    : React.PropTypes.func,
  className : React.PropTypes.string,
  context   : React.PropTypes.oneOf(['danger', 'info', 'success', 'warning']),
  kitid     : React.PropTypes.string,
  message   : React.PropTypes.any,
  onClick   : React.PropTypes.func,
  timeout   : React.PropTypes.number
}


const Notify = (props) => {
  // CSS classes
  const cssClassNames = helpers.cleanClasses([
    'uk-notify',
    props.classes,
    props.pos ? `uk-notify-${props.pos}` : null,
    props.className
  ])

  const items = props.messages.map((item, index) => {
    const id = item.kitid || cuid()

    return <NotifyMessage
      key={id}
      message={item.message}
      context={item.context}
      onFade={props.onFade}
      pos={item.pos}
      kitid={id}
      timeout={item.timeout}
      onClick={item.onClick}
    />
  }).reverse()

  // Return Component
  return props.isOpened ? <div
    className={cssClassNames}
    data-kitid={props.kitid}
  >
    {items}
  </div> : null
}


Notify.propTypes = {
  children  : React.PropTypes.any,
  isOpened  : React.PropTypes.bool,
  onFade    : React.PropTypes.func,
  classes   : React.PropTypes.array,
  className : React.PropTypes.string,
  items     : React.PropTypes.object,
  kitid     : React.PropTypes.string,
  pos       : React.PropTypes.oneOf([
    'bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'
  ]),
  messages  : React.PropTypes.array
}


export default base(Notify)
