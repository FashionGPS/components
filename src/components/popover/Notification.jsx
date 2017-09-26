import Infinite from 'react-infinite-scroll-component'
import React from 'react'
import _ from 'lodash'
import cn from 'classnames'
import moment from 'moment'
import Bell from './_bell'
import PopOver from './_popOver'
import { CssSpinner as Spinner } from '../spinner/Css'

function renderItems(item) {
  return (
    <div key={`notification-${item.id}`} className={cn('notification', { bold: item.state === 'new' })}>
      <div className="notification-date">{moment(item.created_at).calendar()}</div>
      <div className="notification-content" onClick={() => {}} dangerouslySetInnerHTML={{ __html: item.content }} />
    </div>
  )
}

const Container = ({ isNotifToggled, onToggle, onInfiniteLoad, items, isLoading, scrollContainerId }) => (
  <div className="container-notification">
    <Bell onClick={onToggle} size={40} />
    <PopOver isOpen={isNotifToggled} onClose={onToggle} scrollContainerId={scrollContainerId}>
      <Infinite
        height={350}
        next={onInfiniteLoad}
        scrollThreshold={0.8}
        hasMore={!_.isNull(isLoading)}
        endMessage={items.length ? 'No more notifications' : ' '}
        loader={<Spinner type="rays" />}
      >
        {items.map(renderItems)}
        {items.length ? null : <div className="notification text-center" style={{ borderBottomWidth: 0, margin: '50% 0' }} >You have no notifications for the moment</div>}
      </Infinite>
    </PopOver>
  </div>
)

export default Container
