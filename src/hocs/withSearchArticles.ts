import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../constants'
import { ArticleDigest, GQLConnectionArgs, Connection } from '../definitions'
import { getSearchKey } from '../utils'
import QuerySearchArticles from '../gql/queries/searchArticles.gql'

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

export default graphql<
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables,
  SearchArticlesChildProps
>(QuerySearchArticles, {
  // name: 'searchArticles',
  options: props => ({
    notifyOnNetworkStatusChange: true,
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
