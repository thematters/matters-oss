import * as React from 'react'
import { Skeleton, Empty } from 'antd'

import withAnnouncementDetail, { AnnouncementDetailChildProps } from './withAnnouncement'
import Detail from '../../components/Announcement/Detail'
import ErrorMessage from '../../components/ErrorMessage'

class AnnouncementDetail extends React.Component<AnnouncementDetailChildProps> {
  public render() {
    const { data: { official, loading, error} } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    const announcement = official?.announcements[0]
    if (!announcement) {
      return null
    }

    return (
      <Detail
        data={announcement}
        loading={loading}
      />
    )
  }
}

export default withAnnouncementDetail(AnnouncementDetail)
