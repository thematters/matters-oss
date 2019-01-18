import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../../utils'
import {
  AuthorsInputProps,
  AuthorsResponse,
  AuthorsVariables,
  AuthorsChildProps,
  SearchUsersInputProps,
  SearchUsersResponse,
  SearchUsersVariables,
  SearchUsersChildProps
} from './type'
import { GQL_FRAGMENT_USER_DIGEST } from '../../../gql'

const GET_AUTHORS = gql`
  query Authors($input: AuthorsInput!) {
    viewer {
      recommendation {
        authors(input: $input) {
          edges {
            node {
              ...UserDigest
            }
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_USER_DIGEST}
`
const SEARCH_USERS = gql`
  query SearchUsers($input: SearchInput!) {
    search(input: $input) {
      edges {
        node {
          ... on User {
            ...UserDigest
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_USER_DIGEST}
`

const authors = graphql<
  AuthorsInputProps,
  AuthorsResponse,
  AuthorsVariables,
  AuthorsChildProps
>(GET_AUTHORS, {
  options: props => ({
    // name: 'Authors',
    variables: {
      input: {
        first: 10
      }
    }
  }),
  skip: () => !!getSearchKey()
})

const searchUsers = graphql<
  SearchUsersInputProps,
  SearchUsersResponse,
  SearchUsersVariables,
  SearchUsersChildProps
>(SEARCH_USERS, {
  options: props => ({
    // name: 'searchUsers',
    variables: {
      input: {
        key: getSearchKey(),
        type: 'User',
        first: 10
      }
    }
  }),
  skip: () => !getSearchKey()
})

export default compose(
  authors,
  searchUsers
)
