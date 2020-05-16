import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../utils'
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
  options: (props) => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          key: getSearchKey(),
          type: 'User',
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
        },
      },
    }
  },
  skip: () => !getSearchKey(),
})
