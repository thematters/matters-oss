import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../../constants'
import { UserDigest, GQLConnectionArgs, Connection } from '../../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../../utils'
import searchUsers, {
  SearchUsersChildProps,
} from '../../../hocs/withSearchUsers'
import QueryRecommendAuthors from '../../../gql/queries/recommendAuthors.gql'

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

const authors = graphql<
  AuthorsInputProps,
  AuthorsResponse,
  AuthorsVariables,
  AuthorsChildProps
>(QueryRecommendAuthors, {
  // name: 'authors',
  options: (props) => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
          oss: true,
        },
      },
    }
  },
  skip: () => !!getSearchKey(),
})

export default compose(authors, searchUsers)
