import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { ArticleDetail } from '../../definitions'
import { GQL_FRAGMENT_ARTICLE_DETAIL } from '../../gql'

const GET_ARTICLE_DETAIL = gql`
  query ArticleDetail($input: NodeInput!) {
    article: node(input: $input) {
      ... on Article {
        ...ArticleDetail
      }
    }
  }
  ${GQL_FRAGMENT_ARTICLE_DETAIL}
`

export type ArticleDetailResponse = {
  article: ArticleDetail
}
export type ArticleDetailInputProps = RouteComponentProps
export type ArticleDetailVariables = {
  input: {
    id: string
  }
}
export type ArticleDetailChildProps = ChildDataProps<
  ArticleDetailInputProps,
  ArticleDetailResponse,
  ArticleDetailVariables
>

const articleDetail = graphql<
  ArticleDetailInputProps,
  ArticleDetailResponse,
  ArticleDetailVariables,
  ArticleDetailChildProps
>(GET_ARTICLE_DETAIL, {
  options: props => {
    const id = _get(props, 'match.params.id')
    return {
      variables: {
        input: {
          id
        }
      }
    }
  }
})

export default articleDetail