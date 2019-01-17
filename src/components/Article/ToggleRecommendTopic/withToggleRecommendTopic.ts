import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_RECOMMEND_TOPIC = gql`
  mutation ToggleRecommendTopic($input: ToggleRecommendTopicInput!) {
    toggleRecommendTopic(input: $input) {
      id # for update cache
      oss {
        inRecommendTopic
      }
    }
  }
`

type Response = {
  toggleRecommendTopic: {
    oss: {
      inRecommendTopic: boolean
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

const withToggleRecommendTopic = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_RECOMMEND_TOPIC)

export default withToggleRecommendTopic
