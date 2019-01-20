import { graphql, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import { GQL_FRAGMENT_USER_DIGEST, GQL_FRAGMENT_CONNECTION_INFO } from '../gql'
import { PAGE_SIZE } from '../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../definitions'
import { getSearchKey } from '../utils'

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

const SEARCH_USERS = gql`
  query SearchArticles($input: SearchInput!) {
    search(input: $input) {
      ...ConnectionInfo
      edges {
        node {
          ... on Article {
            ...UserDigest
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_USER_DIGEST}
`

export default graphql<
  SearchUsersInputProps,
  SearchUsersResponse,
  SearchUsersVariables,
  SearchUsersChildProps
>(SEARCH_USERS, {
  // name: 'searchUsers',
  options: props => ({
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
