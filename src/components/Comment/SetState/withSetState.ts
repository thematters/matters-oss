import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_STATE = gql`
  mutation updateCommentState($input: UpdateCommentStateInput!) {
    updateCommentState(input: $input) {
      id # for update cache
      state
    }
  }
`

type Response = {
  updateCommentState: {
    state: string
  }
}

export type CommentState = 'active' | 'archived' | 'banned'

type InputProps = {
  id: string
  state: CommentState
}

type Variables = {
  input: {
    id: string
    state: CommentState
    banDays?: number
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetState = graphql<InputProps, Response, Variables, ChildProps>(
  SET_STATE
)

export default withSetState
