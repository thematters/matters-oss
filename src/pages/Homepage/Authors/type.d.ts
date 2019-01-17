import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { UserDigest, GQLConnectionArgs, Connection } from '../../../definitions'

export type AuthorsResponse = {
  viewer: {
    recommendation: {
      authors: Connection<UserDigest>
    }
  }
}
export type AuthorsInputProps = RouteComponentProps
export type AuthorsVariables = {
  input: GQLConnectionArgs
}
export type AuthorsChildProps = ChildDataProps<
  AuthorsInputProps,
  AuthorsResponse,
  AuthorsVariables
>

export type SearchUsersResponse = {
  search: Connection<UserDigest>
}
export type SearchUsersInputProps = RouteComponentProps
export type SearchUsersVariables = {
  input: GQLConnectionArgs & {
    key: string
    type: 'User'
  }
}
export type SearchUsersChildProps = ChildDataProps<
  SearchUsersInputProps,
  SearchUsersResponse,
  SearchUsersVariables
>
