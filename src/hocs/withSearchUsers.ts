import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../utils'
import QuerySearchUsers from '../gql/queries/searchUsers.gql'

type SearchUsersResponse = {
  search: Connection<UserDigest>
  user: UserDigest
}
type SearchUsersInputProps = RouteComponentProps
type SearchUsersVariables = {
  input1: GQLConnectionArgs & {
    key: string
    type: 'User'
  }
  input2: {
    userName: string
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
  options: (_) => {
    const currentPagination = getCurrentPaginationFromUrl()
    const key = getSearchKey()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input1: {
          key,
          type: 'User',
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
          version: 'v20230301'
        },
        input2: {
          userName: key,
        },
      },
    }
  },
  skip: () => !getSearchKey(),
})
