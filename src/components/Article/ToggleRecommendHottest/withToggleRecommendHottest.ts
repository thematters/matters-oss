import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_RECOMMEND_HOTTEST = gql`
  mutation ToggleRecommendHottest($input: ToggleRecommendHottestInput!) {
    toggleRecommendHottest(input: $input) {
      id # for update cache
      oss {
        inRecommendHottest
      }
    }
  }
`

type Response = {
  toggleRecommendHottest: {
    oss: {
      inRecommendHottest: boolean
    }
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

const withToggleRecommendHottest = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_RECOMMEND_HOTTEST)

export default withToggleRecommendHottest
