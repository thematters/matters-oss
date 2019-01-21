import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../definitions'
import { getSearchKey } from '../utils'
import QuerySearchUsers from '../gql/queries/searchUsers.gql'

type SearchUsersResponse = {
  search: Connection<UserDigest>
}
type SearchUsersInputProps = RouteComponentProps
type SearchUsersVariables = {
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

export default graphql<
  SearchUsersInputProps,
  SearchUsersResponse,
  SearchUsersVariables,
  SearchUsersChildProps
>(QuerySearchUsers, {
  // name: 'searchUsers',
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        key: getSearchKey(),
        type: 'User',
        first: PAGE_SIZE
      }
    }
  }),
  skip: () => !getSearchKey()
})
