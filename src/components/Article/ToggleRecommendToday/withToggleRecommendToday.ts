import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_RECOMMEND_TODAY = gql`
  mutation ToggleRecommendToday($input: ToggleRecommendTodayInput!) {
    toggleRecommendToday(input: $input) {
      id # for update cache
      oss {
        inRecommendToday
      }
    }
  }
`

type Response = {
  toggleRecommendToday: {
    oss: {
      inRecommendToday: boolean
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

const withToggleRecommendToday = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_RECOMMEND_TODAY)

export default withToggleRecommendToday
