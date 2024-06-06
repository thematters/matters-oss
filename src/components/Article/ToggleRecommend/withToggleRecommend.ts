import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const TOGGLE_RECOMMEND = gql`
  mutation ToggleRecommend($input: ToggleRecommendInput!) {
    toggleArticleRecommend(input: $input) {
      id
      oss {
        inRecommendIcymi
        inRecommendHottest
        inRecommendNewest
        inSearch
      }
    }
  }
`

type Response = {
  toggleArticleRecommend: {
    oss: {
      inRecommendIcymi: boolean
      inRecommendHottest: boolean
      inRecommendNewest: boolean
      inSearch: boolean
    }
  }
}

export type RecommendTypes = 'icymi' | 'hottest' | 'newest' | 'search'

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
