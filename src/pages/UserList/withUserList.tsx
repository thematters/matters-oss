import { graphql, compose, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey } from '../../utils'
import {
  GQL_FRAGMENT_USER_DIGEST,
  GQL_FRAGMENT_CONNECTION_INFO
} from '../../gql'
import { PAGE_SIZE } from '../../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../../definitions'
import searchUsers, { SearchUsersChildProps } from '../../hocs/withSearchUsers'

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

const GET_ALL_USERS = gql`
  query AllUsers($input: UsersInput!) {
    oss {
      users(input: $input) {
        ...ConnectionInfo
        edges {
          node {
            ...UserDigest
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_USER_DIGEST}
`

const allUsers = graphql<
  AllUsersInputProps,
  AllUsersResponse,
  AllUsersVariables,
  AllUsersChildProps
>(GET_ALL_USERS, {
  // name: 'allUsers',
  options: props => ({
    variables: {
      input: {
        first: PAGE_SIZE
      }
    }
  }),
  skip: () => !!getSearchKey()
})

export default compose(
  allUsers,
  searchUsers
)
