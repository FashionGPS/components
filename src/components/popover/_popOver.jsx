import React from 'react'
import scroll from 'scroll'
import _ from 'lodash'
import ease from 'ease-component'
import PropTypes from 'prop-types'
import Portal from './_portal'

export default class PopOver extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func,
    isCreatingNewItem: PropTypes.bool,
    scrollContainerId: PropTypes.string,
    isOpen: PropTypes.bool,
  }

  static defaultProps = {
    onClose() {}, // eslint-disable-line
    actions: [],
    isOpen: true,
  }

  constructor() {
    super()
    this.handleClose = this.handleClose.bind(this)
    this.handleResize = _.debounce(this.repositionElement.bind(this), 17) // 60fps
    this.resetPosition = this.resetPosition.bind(this)
    this.scrollOptions = {
      duration: 250,
      ease: ease.easeInOutQuart,
    }
    this.state = {
      scrollContainer: null,
    }
  }

  componentWillReceiveProps() {
    this.setState({
      scrollContainer: this.props.scrollContainerId ? document.getElementById(this.props.scrollContainerId) : document.body.firstChild.nextSibling,
    })
  }

  componentWillUnmount() {
    if (this.state.scrollContainer && this.initialScrollTop) {
      scroll.top(this.state.scrollContainer, this.initialScrollTop, this.scrollOptions)
    }
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyDown)
  }

  setRootElement = element => {
    this._rootElement = element
  }

  setPortalModalElement = element => {
    this._portalModalElement = element
  }

  setArrowElement = element => {
    this._arrowElement = element
  }

  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.handleClose()
    }
  }

  handleBackdropClick = event => {
    this.handleClose()
    event.stopPropagation()
    event.preventDefault()
  }

  handleClose() {
    if (this.state.scrollContainer) {
      scroll.top(this.state.scrollContainer, this.initialScrollTop, this.scrollOptions)
    }
    this.props.onClose()
  }

  repositionElement() {
    const rootElement = this._rootElement
    const portalModalElement = this._portalModalElement

    if (!rootElement || !portalModalElement) {
      return
    }

    const rootRects = rootElement.getBoundingClientRect()
    const portalModalRects = portalModalElement.getBoundingClientRect()
    const scrollTop = this.state.scrollContainer.scrollTop
    const height = portalModalRects.height
    const { top, right } = rootRects

    // we can use window since we don't support horizontal scrolling
    // and the backdrop is fixed
    const containerOffsetHeight = this.state.scrollContainer.offsetHeight

    const padding = 30

    // Scroll container when there is no space
    if ((containerOffsetHeight) < (top + height)) {
      let newScrollTop = (containerOffsetHeight - top - height - scrollTop - padding) * -1

      // If element is to big for screen, scroll top only top of the element
      if (height > containerOffsetHeight) {
        newScrollTop = (top + scrollTop) - (padding * 3)
      }

      scroll.top(this.state.scrollContainer, newScrollTop, this.scrollOptions)
    }

    // Need more bottom space
    if (this.state.scrollContainer.scrollHeight < (scrollTop + top + height)) {
      const extraPaddingBottom = Math.abs(this.state.scrollContainer.scrollHeight - scrollTop - height - top)
      this.state.scrollContainer.style.paddingBottom = `${extraPaddingBottom}px`
      let newScrollTop = (containerOffsetHeight - top - height - scrollTop) * -1

      // If element is to big for screen, scroll top only top of the element
      if (height > containerOffsetHeight) {
        newScrollTop = (top + scrollTop) - (padding * 3)
      }
      scroll.top(this.state.scrollContainer, newScrollTop, this.scrollOptions)
    }

    const windowWidth = window.innerWidth
    this._portalModalElement.style.right = windowWidth - right
  }

  resetPosition() {
    this._portalModalElement.style.right = '150'
    this._arrowElement.style.transform = 'translateX(0px)'
  }

  addResizeListener() {
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('keydown', this.handleKeyDown)
  }

  renderPortal = scrollContainer => {
    const { title, children, isCreatingNewItem } = this.props
    const rootElement = this._rootElement
    const rootRects = rootElement.getBoundingClientRect()
    const { top, left } = rootRects
    const { scrollTop } = scrollContainer

    const windowWidth = window.innerWidth
    const modalTop = top + scrollTop
    const modalRight = windowWidth - left - 80

    return (
      <Portal
        isOpen
        scrollContainer={scrollContainer}
        onOpen={this.addResizeListener}
        className="portal"
      >
        <div className="overlay" onClick={this.handleBackdropClick} >
          <div
            className="portalModal"
            ref={this.setPortalModalElement}
            onClick={this.handleClose}
            style={{
              position: 'absolute',
              top: `${modalTop}px`,
              right: `${modalRight}px`,
            }}
          >
            <div className="arrow" ref={this.setArrowElement} />
            {
              title ?
                <div className="head">
                  <h3 className="title">
                    {
                      isCreatingNewItem && 'New '
                    }
                    {title}
                  </h3>
                </div>
              : null
            }
            <div className="content">
              {children}
            </div>
          </div>
        </div>
      </Portal>
    )
  }

  render() {
    const { isOpen } = this.props
    return (
      <div ref={this.setRootElement}>
        {this.state.scrollContainer && isOpen && this.renderPortal(this.state.scrollContainer)}
      </div>
    )
  }
}
