import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_RECOMMEND_ICYMI = gql`
  mutation ToggleRecommendIcymi($input: ToggleRecommendIcymiInput!) {
    toggleRecommendIcymi(input: $input) {
      id # for update cache
      oss {
        inRecommendIcymi
      }
    }
  }
`

type Response = {
  toggleRecommendIcymi: {
    oss: {
      inRecommendIcymi: boolean
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

const withToggleRecommendIcymi = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_RECOMMEND_ICYMI)

export default withToggleRecommendIcymi
