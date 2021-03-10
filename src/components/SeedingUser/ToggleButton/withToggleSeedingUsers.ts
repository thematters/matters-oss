import { graphql, compose, ChildMutateProps } from 'react-apollo'

import TOGGLE_SEEDING_USERS from '../../../gql/mutations/toggleSeedingUsers.gql'

import { UserDigest } from '../../../definitions'

type Response = {
  toggleSeedingUsers: boolean
}

type InputProps = {
  users: UserDigest[]
  enabled: boolean
  callback?: () => void
}

type Variables = {
  input: {
    ids: string[]
    enabled: boolean
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withToggleSeedingUsers = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_SEEDING_USERS)

export default withToggleSeedingUsers
