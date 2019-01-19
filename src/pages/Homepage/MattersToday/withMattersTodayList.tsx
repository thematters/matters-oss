import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../../utils'
import {
  MattersTodayInputProps,
  MattersTodayResponse,
  MattersTodayVariables,
  MattersTodayChildProps,
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables,
  SearchArticlesChildProps
} from './type'
import { GQL_FRAGMENT_ARTICLE_DIGEST } from '../../../gql'

const GET_MATTERS_TODAY = gql`
  query MattersToday($input: ConnectionArgs!) {
    oss {
      today(input: $input) {
        edges {
          node {
            ...ArticleDigest
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

const mattersToday = graphql<
  MattersTodayInputProps,
  MattersTodayResponse,
  MattersTodayVariables,
  MattersTodayChildProps
>(GET_MATTERS_TODAY, {
  // name: 'today',
  options: props => ({
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
  // name: 'searchArticles',
  options: props => ({
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
  mattersToday,
  searchArticles
)
