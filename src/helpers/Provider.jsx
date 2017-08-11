import React from 'react'
import PropTypes from 'prop-types'

const items = [
  {
    id: '58b6f31c9f4ee8a6613b1a71',
    content: 'asdf has been added to your profile list. <a href="/brand/58b6f31c9f4ee8a6613b1a70">Show</a>',
    state: 'new',
    created_at: '2017-03-01T16:13:16.425Z',
  },
  {
    id: '58ad61c49f4ee87905538665',
    content: 'asdf has been added to your profile list. <a href="/brand/58ad61c49f4ee87905538664">Show</a>',
    state: 'new',
    created_at: '2017-02-22T10:02:44.322Z',
  },
  {
    id: '58ad61329f4ee87905538653',
    content: 'asdf has been added to your profile list. <a href="/brand/58ad61329f4ee87905538652">Show</a>',
    state: 'new',
    created_at: '2017-02-22T10:00:18.105Z',
  },
  {
    id: '58ad60d19f4ee8790653863d',
    content: 'mr six has been added to your profile list. <a href="/brand/58ad60d19f4ee8790653863c">Show</a>',
    state: 'new',
    created_at: '2017-02-22T09:58:41.507Z',
  },
  {
    id: '58ad60a19f4ee87906538635',
    content: 'Marcia West has been added to your profile list. <a href="/brand/578c9b159f4ee8be4ba3e3a1">Show</a>',
    state: 'new',
    created_at: '2017-02-22T09:57:53.202Z',
  },
  {
    id: '58944de39f4ee8291807a615',
    content: 'kjansdf has been added to your profile list. <a href="http://localhost/brand/58944de39f4ee8291807a614">Show</a>',
    state: 'new',
    created_at: '2017-02-03T09:31:15.296Z',
  },
  {
    id: '588628619f4ee80bc8050697',
    content: 'ASDFASDf has been added to your profile list. <a href="http://localhost/brand/588628619f4ee80bc8050696">Show</a>',
    state: 'read',
    created_at: '2017-01-23T15:59:29.577Z',
  },
]

export default class Provider extends React.Component {
  static propTypes = {
    mapWithState: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      isNotifToggled: false,
      isAvatarToggled: false,
      isImageToggled: false,
      isAlertToggled: false,
      isLoading: false,
      onNotifToggle: this.onNotifToggle.bind(this),
      onAvatarToggle: this.onAvatarToggle.bind(this),
      onImageToggle: this.onImageToggle.bind(this),
      onAvatarCrop: this.onAvatarCrop.bind(this),
      onInfiniteLoad: this.onInfiniteLoad.bind(this),
      onAlertToggle: this.onAlertToggle.bind(this),
      croppedImage: null,
      items,
    }
  }

  onNotifToggle() {
    this.setState({ isNotifToggled: !this.state.isNotifToggled })
  }

  onImageToggle() {
    this.setState({ isImageToggled: !this.state.isImageToggled })
  }

  onAlertToggle() {
    this.setState({ isAlertToggled: !this.state.isAlertToggled })
  }

  onAvatarToggle(options) {
    this.setState(Object.assign({ iAvatarToggled: !this.state.iAvatarToggled }, options && options.reset ? { croppedImage: null } : {}))
  }

  onAvatarCrop(croppedImage) {
    this.setState({ croppedImage })
  }

  onInfiniteLoad() {
    this.setState({ isLoading: !this.state.isLoading })
  }

  render() {
    return this.props.mapWithState(this.state, this.props)
  }
}
