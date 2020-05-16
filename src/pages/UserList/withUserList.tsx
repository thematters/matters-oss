import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey, getCurrentPaginationFromUrl } from '../../utils'
import { PAGE_SIZE } from '../../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../../definitions'
import searchUsers, { SearchUsersChildProps } from '../../hocs/withSearchUsers'
import QueryUserList from '../../gql/queries/userList.gql'

type AllUsersResponse = {
  oss: {
    users: Connection<UserDigest>
  }
}
type AllUsersInputProps = RouteComponentProps
type AllUsersVariables = {
  input: GQLConnectionArgs
}
type AllUsersChildProps = ChildDataProps<
  AllUsersInputProps,
  AllUsersResponse,
  AllUsersVariables
>

export type UserListChildProps = AllUsersChildProps & SearchUsersChildProps

const allUsers = graphql<
  AllUsersInputProps,
  AllUsersResponse,
  AllUsersVariables,
  AllUsersChildProps
>(QueryUserList, {
  // name: 'allUsers',
  options: (props) => {
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

export default compose(allUsers, searchUsers)
