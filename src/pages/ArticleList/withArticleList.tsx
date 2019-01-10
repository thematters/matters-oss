import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../utils'
import {
  AllArticlesInputProps,
  AllArticlesResponse,
  AllArticlesVariables,
  AllArticlesChildProps,
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables,
  SearchArticlesChildProps
} from './type'
import { GQL_FRAGMENT_ARTICLE_DIGEST } from '../../gql'

const GET_ALL_ARTICLES = gql`
  query AllArticles($input: ArticlesInput!) {
    articles(input: $input) {
      edges {
        node {
          ...ArticleDigest
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
          node {
            ... on Article {
              ...ArticleDigest
            }
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
`

const allArticles = graphql<
  AllArticlesInputProps,
  AllArticlesResponse,
  AllArticlesVariables,
  AllArticlesChildProps
>(GET_ALL_ARTICLES, {
  options: props => ({
    // name: 'allArticles',
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
  allArticles,
  searchArticles
)
