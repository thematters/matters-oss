import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_ARTICLE_BOOST = gql`
  mutation setArticleBoost($input: SetArticleBoostInput!) {
    setArticleBoost(input: $input) {
      id # for update cache
      oss {
        boost
        score
      }
    }
  }
`

type Response = {
  setArticleBoost: {
    oss: {
      boost: number
      score: number
    }
  }
}

type InputProps = {
  boost: number
  articleId: string
}

type Variables = {
  input: {
    id: string
    boost: number
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetArticleBoost = graphql<
  InputProps,
  Response,
  Variables,
  ChildProps
>(SET_ARTICLE_BOOST)

export default withSetArticleBoost
