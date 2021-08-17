import { graphql, compose, ChildMutateProps } from 'react-apollo'

import { Announcement } from '../definitions'
import MutationDeleteAnnouncements from '../gql/mutations/deleteAnnouncements.gql'
import MutationPutAnnouncement from '../gql/mutations/putAnnouncement.gql'

/**
 * Delete Announcements
 */
type DeleteAnnouncementsResponse = {
  deleteAnnouncements: boolean
}

type DeleteAnnouncementsInputProps = {
  ids: string[]
}

type DeleteAnnouncementsVariables = {
  input: {
    ids: string[]
  }
}

export type DeleteAnnouncementsChildProps = ChildMutateProps<
  DeleteAnnouncementsInputProps,
  DeleteAnnouncementsResponse,
  DeleteAnnouncementsVariables
>

const deleteAnnouncements = graphql<
  DeleteAnnouncementsInputProps,
  DeleteAnnouncementsResponse,
  DeleteAnnouncementsVariables,
  DeleteAnnouncementsChildProps
>(MutationDeleteAnnouncements, {
  name: 'deleteAnnouncements',
})

/**
 * Put Announcement
 */
type PutAnnouncementResponse = {
  putAnnouncement: Announcement
}

type PutAnnouncementInputProps = {
  id: string
  cover: string
  link: string
  type: string
  order: number
}

type PutAnnouncementVariables = {
  input: {
    id: string
    cover: string
    link: string
    type: string
    order: number
  }
}

export type PutAnnouncementChildProps = ChildMutateProps<
  PutAnnouncementInputProps,
  PutAnnouncementResponse,
  PutAnnouncementVariables
>

const putAnnouncement = graphql<
  PutAnnouncementInputProps,
  PutAnnouncementResponse,
  PutAnnouncementVariables,
  PutAnnouncementChildProps
>(MutationPutAnnouncement, {
  name: 'putAnnouncement',
})

export default compose(deleteAnnouncements, putAnnouncement)

export type AnnouncementMutationsChildProps = DeleteAnnouncementsChildProps &
  PutAnnouncementChildProps
