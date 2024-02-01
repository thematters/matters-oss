import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_STATE = gql`
  mutation updateCommentsState($input: UpdateCommentsStateInput!) {
    updateCommentsState(input: $input) {
      id
      state
    }
  }
`

type Response = {
  updateCommentsState: {
    id: string
    state: string
  }
}

export type CommentState = 'active' | 'archived' | 'banned' | 'collapsed'

type InputProps = {
  ids: string[]
  commentState?: CommentState
  disabled?: boolean
  onSuccess?: () => void
}

type Variables = {
  input: {
    ids: string[]
    state: CommentState
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetState = graphql<InputProps, Response, Variables, ChildProps>(
  SET_STATE
)

export default withSetState
