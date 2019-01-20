import { graphql, ChildDataProps, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import {
  GQL_FRAGMENT_ARTICLE_DIGEST,
  GQL_FRAGMENT_CONNECTION_INFO
} from '../../gql'
import { PAGE_SIZE } from '../../constants'
import { ArticleDigest, GQLConnectionArgs, Connection } from '../../definitions'
import { getSearchKey } from '../../utils'
import searchArticles, {
  SearchArticlesChildProps
} from '../../hocs/withSearchArticles'

type AllArticlesResponse = {
  oss: {
    articles: Connection<ArticleDigest>
  }
}
type AllArticlesInputProps = RouteComponentProps
type AllArticlesVariables = {
  input: GQLConnectionArgs
}
type AllArticlesChildProps = ChildDataProps<
  AllArticlesInputProps,
  AllArticlesResponse,
  AllArticlesVariables
>

export type ArticleListChildProps = AllArticlesChildProps &
  SearchArticlesChildProps

const GET_ALL_ARTICLES = gql`
  query AllArticles($input: ArticlesInput!) {
    oss {
      articles(input: $input) {
        ...ConnectionInfo
        edges {
          node {
            ...ArticleDigest
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
`

const allArticles = graphql<
  AllArticlesInputProps,
  AllArticlesResponse,
  AllArticlesVariables,
  AllArticlesChildProps
>(GET_ALL_ARTICLES, {
  // name: 'allArticles',
  options: props => ({
    variables: {
      input: {
        first: PAGE_SIZE
      }
    }
  }),
  skip: () => !!getSearchKey()
})

export default compose(
  allArticles,
  searchArticles
)
