import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { CommentDigest, GQLConnectionArgs, Connection } from '../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../utils'
import QueryCommentList from '../../gql/queries/commentList.gql'

type AllCommentsResponse = {
  oss: {
    comments: Connection<CommentDigest>
  }
}
type AllCommentsInputProps = RouteComponentProps
type AllCommentsVariables = {
  input: GQLConnectionArgs
}
type AllCommentsChildProps = ChildDataProps<
  AllCommentsInputProps,
  AllCommentsResponse,
  AllCommentsVariables
>

export type CommentListChildProps = AllCommentsChildProps

const allComments = graphql<
  AllCommentsInputProps,
  AllCommentsResponse,
  AllCommentsVariables,
  AllCommentsChildProps
>(QueryCommentList, {
  // name: 'allComments',
  options: props => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after
        }
      }
    }
  },
  skip: () => !!getSearchKey()
})

export default compose(allComments)
