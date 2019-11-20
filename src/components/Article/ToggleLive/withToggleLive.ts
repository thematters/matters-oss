import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_ARTICLE_LIVE = gql`
  mutation ToggleArticleLive($input: ToggleItemInput!) {
    toggleArticleLive(input: $input) {
      id
      live
    }
  }
`

type Response = {
  toggleArticleLive: {
    live: boolean
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

const withToggleLive = graphql<InputProps, Response, Variables, ChildProps>(
  TOGGLE_ARTICLE_LIVE
)

export default withToggleLive
