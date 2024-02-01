import * as React from 'react'

import List from '../../components/Announcement/List'
import withAnnouncements, { AnnouncementsChildProps } from './withAnnouncements'
import ErrorMessage from '../../components/ErrorMessage'

class AnnouncementList extends React.Component<AnnouncementsChildProps> {
  public render() {
    const {
      data: { official, loading, error, refetch },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <List
        data={official?.announcements || []}
        loading={loading}
        refetch={refetch}
      />
    )
  }
}

export default withAnnouncements(AnnouncementList)
