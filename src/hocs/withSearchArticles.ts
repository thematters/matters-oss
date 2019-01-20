import { graphql, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import {
  GQL_FRAGMENT_ARTICLE_DIGEST,
  GQL_FRAGMENT_CONNECTION_INFO
} from '../gql'
import { PAGE_SIZE } from '../constants'
import { ArticleDigest, GQLConnectionArgs, Connection } from '../definitions'
import { getSearchKey } from '../utils'

type SearchArticlesResponse = {
  search: Connection<ArticleDigest>
}
type SearchArticlesInputProps = RouteComponentProps
type SearchArticlesVariables = {
  input: GQLConnectionArgs & {
    key: string
    type: 'Article'
  }
}
export type SearchArticlesChildProps = ChildDataProps<
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables
>

const SEARCH_ARTICLES = gql`
  query SearchArticles($input: SearchInput!) {
    search(input: $input) {
      ...ConnectionInfo
      edges {
        node {
          ... on Article {
            ...ArticleDigest
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
`

export default graphql<
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
        first: PAGE_SIZE
      }
    }
  }),
  skip: () => !getSearchKey()
})
