import React from 'react'
import autobind from 'autobind-decorator'
import SideBar from './_sidebar'

const DOCKED_THRESHOLD_SIDEBAR = 800

export default class OffCanvas extends React.Component {
  constructor() {
    super()
    this.state = {
      mql: null,
      isSideBarOpen: false,
      isSideBarDocked: false,
    }
  }

  componentWillMount() {
    const mql = window.matchMedia(`(min-width: ${DOCKED_THRESHOLD_SIDEBAR}px)`)
    mql.addListener(this.mediaQueryChanged)
    this.setState({ mql })
  }

  componentDidMount() {
    this.mediaQueryChanged()
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged)
  }

  @autobind
  onSetOpen(isSideBarOpen) {
    this.setState({ isSideBarOpen })
  }

  @autobind
  mediaQueryChanged() {
    if (this.state.mql) this.setState({ isSideBarDocked: this.state.mql.matches })
  }

  render() {
    const { isSideBarOpen, isSideBarDocked } = this.state

    return (<SideBar
      sidebarClassName="sidebar"
      sidebar={<div style={{ backgroundColor: 'red', height: '100%', width: 298 }}>hello</div>}
      shadow={false}
      sidebarWidth={298}
      open={isSideBarOpen}
      docked={isSideBarDocked}
      onSetOpen={this.onSetOpen}
    >
      <div style={{ backgroundColor: 'green', height: '100%', color: 'white' }}>try to resize me down !</div>
    </SideBar>)
  }
}
