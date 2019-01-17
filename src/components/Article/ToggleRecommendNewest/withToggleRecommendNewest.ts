import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_RECOMMEND_NEWEST = gql`
  mutation ToggleRecommendNewest($input: ToggleRecommendNewestInput!) {
    toggleRecommendNewest(input: $input) {
      id # for update cache
      oss {
        inRecommendNewest
      }
    }
  }
`

type Response = {
  toggleRecommendNewest: {
    oss: {
      inRecommendNewest: boolean
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

const withToggleRecommendNewest = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_RECOMMEND_NEWEST)

export default withToggleRecommendNewest
