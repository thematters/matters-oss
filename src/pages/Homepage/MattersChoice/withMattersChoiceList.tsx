import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../../utils'
import {
  MattersChoiceInputProps,
  MattersChoiceResponse,
  MattersChoiceVariables,
  MattersChoiceChildProps,
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables,
  SearchArticlesChildProps
} from './type'
import { GQL_FRAGMENT_ARTICLE_DIGEST } from '../../../gql'

const GET_MATTERS_CHOICE = gql`
  query MattersChoice($input: ConnectionArgs!) {
    viewer {
      recommendation {
        icymi(input: $input) {
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

const mattersChoice = graphql<
  MattersChoiceInputProps,
  MattersChoiceResponse,
  MattersChoiceVariables,
  MattersChoiceChildProps
>(GET_MATTERS_CHOICE, {
  // name: 'MattersChoice',
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
  mattersChoice,
  searchArticles
)
