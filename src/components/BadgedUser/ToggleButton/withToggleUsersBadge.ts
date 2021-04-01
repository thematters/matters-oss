import { graphql, ChildMutateProps } from 'react-apollo'

import TOGGLE_USERS_BADGE from '../../../gql/mutations/toggleUsersBadge.gql'

import { UserDigest, USER_BADGE_TYPES } from '../../../definitions'

type Response = {
  toggleUsersBadge: boolean
}

type InputProps = {
  users: UserDigest[]
  type: USER_BADGE_TYPES
  enabled: boolean
  callback?: () => void
}

type Variables = {
  input: {
    ids: string[]
    type: USER_BADGE_TYPES
    enabled: boolean
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withToggleUsersBadge = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_USERS_BADGE)

export default withToggleUsersBadge
