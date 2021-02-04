import { graphql, ChildMutateProps } from 'react-apollo'

import TOGGLE_ARTICLE_LIVE from '../../gql/mutations/toggleArticleLive.gql'

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
