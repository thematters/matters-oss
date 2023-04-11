import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey, getCurrentPaginationFromUrl } from '../../utils'
import { PAGE_SIZE } from '../../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../../definitions'
import searchUsers, { SearchUsersChildProps } from '../../hocs/withSearchUsers'
import RestrictedUserList from '../../gql/queries/restrictedUserList.gql'

type RestrictedUsersResponse = {
  oss: {
    restrictedUsers: Connection<UserDigest>
  }
}
type RestrictedUsersInputProps = RouteComponentProps
type RestrictedUsersVariables = {
  input: GQLConnectionArgs
}
type RestrictedUsersChildProps = ChildDataProps<
  RestrictedUsersInputProps,
  RestrictedUsersResponse,
  RestrictedUsersVariables
>

export type RestrictedUserListChildProps = RestrictedUsersChildProps &
  SearchUsersChildProps

const restrictedUsers = graphql<
  RestrictedUsersInputProps,
  RestrictedUsersResponse,
  RestrictedUsersVariables,
  RestrictedUsersChildProps
>(RestrictedUserList, {
  // name: 'restrictedUsers',
  options: (_) => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
        },
      },
    }
  },
  skip: () => !!getSearchKey(),
})

export default compose(restrictedUsers, searchUsers)
