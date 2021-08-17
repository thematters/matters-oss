import _get from 'lodash/get'
import { ChildDataProps, graphql } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { Announcement } from '../../definitions'
import QueryAnnouncementDetail from '../../gql/queries/announcementDetail.gql'

export type AnnouncementDeatilResponse = {
  official: {
    announcements: Announcement[]
  }
}

export type AnnouncementDetailInputProps = RouteComponentProps

export type AnnouncementDetailVariables = {
  input: {
    id: string
  }
}

export type AnnouncementDetailChildProps = ChildDataProps<
  AnnouncementDetailInputProps,
  AnnouncementDeatilResponse,
  AnnouncementDetailVariables
>

const announcementDetail = graphql<
  AnnouncementDetailInputProps,
  AnnouncementDeatilResponse,
  AnnouncementDetailVariables,
  AnnouncementDetailChildProps
>(QueryAnnouncementDetail, {
  options: (props) => {
    const id = _get(props, 'match.params.id')
    return {
      variables: {
        input: { id },
      },
    }
  },
})

export default announcementDetail
