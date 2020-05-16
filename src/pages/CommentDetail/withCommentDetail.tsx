import { graphql } from 'react-apollo'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { CommentDetail } from '../../definitions'
import QueryCommentDetail from '../../gql/queries/commentDetail.gql'

type CommentDetailResponse = {
  comment: CommentDetail
}
type CommentDetailInputProps = RouteComponentProps
type CommentDetailVariables = {
  input: {
    id: string
  }
}
export type CommentDetailChildProps = ChildDataProps<
  CommentDetailInputProps,
  CommentDetailResponse,
  CommentDetailVariables
>

const withCommentDetail = graphql<
  CommentDetailInputProps,
  CommentDetailResponse,
  CommentDetailVariables,
  CommentDetailChildProps
>(QueryCommentDetail, {
  options: (props) => {
    const id = _get(props, 'match.params.id')
    return {
      variables: {
        input: {
          id,
        },
      },
    }
  },
})

export default withCommentDetail
