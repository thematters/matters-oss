import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import gql from 'graphql-tag'
import queryString from 'query-string'

/**
 * GraphQL
 */
const ARTICLE_LIST_FRAGMENT = gql`
  fragment ArticleList on Article {
    id
    # slug
    createdAt
    publishState
    public
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
      ...ArticleList
    }
  }
  ${ARTICLE_LIST_FRAGMENT}
`
const SEARCH_ARTICLES = gql`
  query SearchArticles($input: SearchInput!) {
    search(input: $input) {
      node {
        ... on Article {
          ...ArticleList
        }
      }
    }
  }
  ${ARTICLE_LIST_FRAGMENT}
`

/**
 * Types
 */
export type Article = {
  id: string
  slug: string
  createdAt: Date
  publishState: string
  public: boolean
  author: {
    id: string
    uuid: string
    info: {
      userName: string
      displayName: string
    }
  }
  title: string
  tags: string[]
}

type SearchResult = {
  node: Article
  match: String
}

type AllResponse = {
  articles: Article[]
}

type AllInputProps = RouteComponentProps

type AllVariables = {
  input: {
    offset: number
    limit: number
  }
}

type SearchResponse = {
  search: SearchResult[]
}

type SearchInputProps = RouteComponentProps

type SearchVariables = {
  input: {
    key: string
    type: 'Article'
    offset: number
    limit: number
  }
}

export type AllChildProps = ChildDataProps<
  AllInputProps,
  AllResponse,
  AllVariables
>

export type SearchChildProps = ChildDataProps<
  SearchInputProps,
  SearchResponse,
  SearchVariables
>

/**
 *
 */
const getSearchKey = (locationSearch: string): string => {
  return (queryString.parse(locationSearch).q as string) || ''
}
const allArticles = graphql<
  AllInputProps,
  AllResponse,
  AllVariables,
  AllChildProps
>(GET_ALL_ARTICLES, {
  options: props => ({
    variables: {
      input: {
        offset: 0,
        limit: 20
      }
    }
  }),
  skip: props => {
    const searchKey = getSearchKey(props.location.search)
    return !!searchKey
  }
})

const searchArticles = graphql<
  SearchInputProps,
  SearchResponse,
  SearchVariables,
  ChildDataProps
>(SEARCH_ARTICLES, {
  options: props => ({
    variables: {
      input: {
        key: getSearchKey(props.location.search),
        type: 'Article',
        offset: 0,
        limit: 20
      }
    }
  }),
  skip: props => {
    const searchKey = getSearchKey(props.location.search)
    return !searchKey
  }
})

export default compose(
  allArticles,
  searchArticles
)
