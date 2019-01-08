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

const ARTICLE_LIST_ITEM_FRAGMENT = gql`
  fragment ArticleListItem on Article {
    id
    # slug
    createdAt
    publishState
    public
    live
    author {
      id
      uuid
      info {
        userName
        displayName
      }
    }
    title
    tags {
      id
      content
    }
  }
`
const GET_ALL_ARTICLES = gql`
  query AllArticles($input: ArticlesInput!) {
    articles(input: $input) {
      ...ArticleListItem
    }
  }
  ${ARTICLE_LIST_ITEM_FRAGMENT}
`
const SEARCH_ARTICLES = gql`
  query SearchArticles($input: SearchInput!) {
    search(input: $input) {
      node {
        ... on Article {
          ...ArticleListItem
        }
      }
    }
  }
  ${ARTICLE_LIST_ITEM_FRAGMENT}
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
        offset: 0,
        limit: 20
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
        offset: 0,
        limit: 20
      }
    }
  }),
  skip: () => !getSearchKey()
})

export default compose(
  allArticles,
  searchArticles
)
