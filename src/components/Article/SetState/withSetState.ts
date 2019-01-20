import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_STATE = gql`
  mutation updateArticleState($input: UpdateArticleStateInput!) {
    updateArticleState(input: $input) {
      id # for update cache
      state
    }
  }
`

type Response = {
  updateArticleState: {
    state: string
  }
}

export type ArticleState = 'active' | 'archived' | 'banned'

type InputProps = {
  id: string
  state: ArticleState
}

type Variables = {
  input: {
    id: string
    state: ArticleState
    banDays?: number
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetState = graphql<InputProps, Response, Variables, ChildProps>(
  SET_STATE
)

export default withSetState
