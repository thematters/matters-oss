import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_ARTICLE_PUBLIC = gql`
  mutation ToggleArticlePublic($input: ToggleArticlePublicInput!) {
    toggleArticlePublic(input: $input) {
      id
      public
    }
  }
`

type Response = {
  toggleArticlePublic: {
    public: boolean
  }
}

type InputProps = {
  checked: boolean
  articleId: string
}

type Variables = {
  input: {
    id: string
    enabled: boolean
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withTogglePublic = graphql<InputProps, Response, Variables, ChildProps>(
  TOGGLE_ARTICLE_PUBLIC
)

export default withTogglePublic
