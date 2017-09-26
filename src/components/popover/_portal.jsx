import React from 'react'
import ReactDOM, { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'

const KEYCODES = {
  ESCAPE: 27,
}

export default class Portal extends React.PureComponent {

  constructor() {
    super()
    this.handleWrapperClick = this.handleWrapperClick.bind(this)
    this.closePortal = this.closePortal.bind(this)
    this.handleOutsideMouseClick = this.handleOutsideMouseClick.bind(this)
    this.handleKeydown = this.handleKeydown.bind(this)
    this.portal = null
    this.node = null
  }

  componentDidMount() {
    if (this.props.closeOnEsc) {
      document.addEventListener('keydown', this.handleKeydown)
    }

    if (this.props.closeOnOutsideClick) {
      document.addEventListener('mouseup', this.handleOutsideMouseClick)
      document.addEventListener('touchstart', this.handleOutsideMouseClick)
    }

    if (this.props.isOpen) {
      this.openPortal()
    }
  }

  componentWillReceiveProps(newProps) {
    // portal's 'is open' state is handled through the prop isOpen
    if (newProps.isOpen) {
      this.renderPortal(newProps)
    } else {
      this.closePortal()
    }

    // portal handles its own 'is open' state
    if (typeof newProps.isOpen === 'undefined') {
      this.renderPortal(newProps)
    }
  }

  componentWillUnmount() {
    if (this.props.closeOnEsc) {
      document.removeEventListener('keydown', this.handleKeydown)
    }

    if (this.props.closeOnOutsideClick) {
      document.removeEventListener('mouseup', this.handleOutsideMouseClick)
      document.removeEventListener('touchstart', this.handleOutsideMouseClick)
    }

    this.closePortal(true)
  }

  handleWrapperClick(e) {
    e.preventDefault()
    e.stopPropagation()
    this.openPortal()
  }

  openPortal(props = this.props) {
    this.renderPortal(props, true)
    document.body.style['margin-right'] = '10px'
    document.body.style.overflow = 'hidden'
  }

  closePortal() {
    const resetPortalState = () => {
      if (this.node) {
        const { scrollContainer } = this.props
        ReactDOM.unmountComponentAtNode(this.node)
        if (scrollContainer) {
          scrollContainer.removeChild(this.node)
          document.body.style.overflow = ''
        } else {
          document.body.removeChild(this.node)
        }
      }
      this.portal = null
      this.node = null
    }

    if (this.props.beforeClose) {
      this.props.beforeClose(this.node, resetPortalState)
    } else {
      resetPortalState()
    }

    this.props.onClose()
  }

  handleOutsideMouseClick(e) {
    const root = findDOMNode(this.portal)
    if (root.contains(e.target) || (e.button && e.button !== 0)) {
      return
    }

    e.stopPropagation()
    this.closePortal()
  }

  handleKeydown(e) {
    if (e.keyCode === KEYCODES.ESCAPE) {
      this.closePortal()
    }
  }

  renderPortal(props, isOpening) {
    if (!this.node) {
      this.node = document.createElement('div')
      this.node.className = this.props.className
      if (props.scrollContainer) {
        props.scrollContainer.appendChild(this.node)
      } else {
        document.body.appendChild(this.node)
      }
    }

    if (isOpening) {
      this.props.onOpen(this.node)
    }

    let children = props.children
    // https://gist.github.com/jimfb/d99e0678e9da715ccf6454961ef04d1b
    if (typeof props.children.type === 'function') {
      children = React.cloneElement(props.children, { closePortal: this.closePortal })
    }

    this.portal = ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      children,
      this.node,
      this.props.onUpdate,
    )
  }

  render() {
    if (this.props.openByClickOn) {
      return React.cloneElement(this.props.openByClickOn, { onClick: this.handleWrapperClick })
    }
    return null
  }
}

Portal.propTypes = {
  scrollContainer: PropTypes.object.isRequired,
  className: PropTypes.string,
  openByClickOn: PropTypes.element,
  closeOnEsc: PropTypes.bool,
  closeOnOutsideClick: PropTypes.bool,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  beforeClose: PropTypes.func,
  onUpdate: PropTypes.func,
}

Portal.defaultProps = {
  onOpen: () => {},
  onClose: () => {},
  onUpdate: () => {},
}
