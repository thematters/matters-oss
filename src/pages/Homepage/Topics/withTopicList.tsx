import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../../utils'
import {
  TopicsInputProps,
  TopicsResponse,
  TopicsVariables,
  TopicsChildProps,
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables,
  SearchArticlesChildProps
} from './type'
import { GQL_FRAGMENT_ARTICLE_DIGEST } from '../../../gql'

const GET_TOPICS = gql`
  query Topics($input: ConnectionArgs!) {
    viewer {
      recommendation {
        topics(input: $input) {
          edges {
            node {
              ...ArticleDigest
            }
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
`
const SEARCH_ARTICLES = gql`
  query SearchArticles($input: SearchInput!) {
    search(input: $input) {
      edges {
        node {
          ... on Article {
            ...ArticleDigest
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
`

const topics = graphql<
  TopicsInputProps,
  TopicsResponse,
  TopicsVariables,
  TopicsChildProps
>(GET_TOPICS, {
  options: props => ({
    // name: 'Topics',
    variables: {
      input: {
        first: 10
      }
    }
  }),
  skip: () => !!getSearchKey()
})

const searchArticles = graphql<
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables,
  SearchArticlesChildProps
>(SEARCH_ARTICLES, {
  options: props => ({
    // name: 'searchArticles',
    variables: {
      input: {
        key: getSearchKey(),
        type: 'Article',
        first: 10
      }
    }
  }),
  skip: () => !getSearchKey()
})

export default compose(
  topics,
  searchArticles
)
