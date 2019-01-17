import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../../utils'
import {
  NewestInputProps,
  NewestResponse,
  NewestVariables,
  NewestChildProps,
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables,
  SearchArticlesChildProps
} from './type'
import { GQL_FRAGMENT_ARTICLE_DIGEST } from '../../../gql'

const GET_NEWEST = gql`
  query Newest($input: ConnectionArgs!) {
    viewer {
      recommendation {
        newest(input: $input) {
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

const newest = graphql<
  NewestInputProps,
  NewestResponse,
  NewestVariables,
  NewestChildProps
>(GET_NEWEST, {
  options: props => ({
    // name: 'Newest',
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
  newest,
  searchArticles
)
