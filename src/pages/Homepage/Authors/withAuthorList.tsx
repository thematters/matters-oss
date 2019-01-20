import { graphql, compose, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import {
  GQL_FRAGMENT_USER_DIGEST,
  GQL_FRAGMENT_CONNECTION_INFO
} from '../../../gql'
import { PAGE_SIZE } from '../../../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../../../definitions'
import { getSearchKey } from '../../../utils'
import searchUsers, {
  SearchUsersChildProps
} from '../../../hocs/withSearchUsers'

type AuthorsResponse = {
  viewer: {
    recommendation: {
      authors: Connection<UserDigest>
    }
  }
}
type AuthorsInputProps = RouteComponentProps
type AuthorsVariables = {
  input: GQLConnectionArgs
}
type AuthorsChildProps = ChildDataProps<
  AuthorsInputProps,
  AuthorsResponse,
  AuthorsVariables
>

export type AuthorListChildProps = AuthorsChildProps & SearchUsersChildProps

const GET_AUTHORS = gql`
  query Authors($input: AuthorsInput!) {
    viewer {
      recommendation {
        authors(input: $input) {
          ...ConnectionInfo
          edges {
            node {
              ...UserDigest
            }
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_USER_DIGEST}
`

const authors = graphql<
  AuthorsInputProps,
  AuthorsResponse,
  AuthorsVariables,
  AuthorsChildProps
>(GET_AUTHORS, {
  // name: 'authors',
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
  authors,
  searchUsers
)
