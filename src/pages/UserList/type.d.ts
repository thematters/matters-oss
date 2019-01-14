import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { UserDigest, GQLConnectionArgs, Connection } from '../../definitions'

export type AllUsersResponse = {
  oss: {
    users: Connection<UserDigest>
  }
}
export type AllUsersInputProps = RouteComponentProps
export type AllUsersVariables = {
  input: GQLConnectionArgs
}
export type AllUsersChildProps = ChildDataProps<
  AllUsersInputProps,
  AllUsersResponse,
  AllUsersVariables
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
