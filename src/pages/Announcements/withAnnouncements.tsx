import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import QueryAnnouncements from '../../gql/queries/announcements.gql'
import { Announcement } from '../../definitions'

type AnnouncementsResponse = {
  official: {
    announcements: Announcement[]
  }
}

type AnnouncementsInputProps = RouteComponentProps

export type AnnouncementsChildProps = ChildDataProps<
  AnnouncementsInputProps,
  AnnouncementsResponse,
  {}
>

const withAnnouncements = graphql<
  AnnouncementsInputProps,
  AnnouncementsResponse,
  {},
  AnnouncementsChildProps
>(QueryAnnouncements)

export default withAnnouncements
