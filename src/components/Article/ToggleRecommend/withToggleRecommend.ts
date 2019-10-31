import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_RECOMMEND = gql`
  mutation ToggleRecommend($input: ToggleArticleRecommendInput!) {
    toggleArticleRecommend(input: $input) {
      id
      oss {
        inRecommendToday
        inRecommendIcymi
        inRecommendHottest
        inRecommendNewest
      }
    }
  }
`

type Response = {
  toggleArticleRecommend: {
    oss: {
      inRecommendToday: boolean
      inRecommendIcymi: boolean
      inRecommendHottest: boolean
      inRecommendNewest: boolean
    }
  }
}

export type RecommendTypes = 'today' | 'icymi' | 'hottest' | 'newest'

type InputProps = {
  checked: boolean
  articleId: string
  type: RecommendTypes
}

type Variables = {
  input: {
    id: string
    enabled: boolean
    type: RecommendTypes
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withToggleRecommend = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(TOGGLE_RECOMMEND)

export default withToggleRecommend
