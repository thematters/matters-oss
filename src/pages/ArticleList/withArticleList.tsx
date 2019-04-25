import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { ArticleDigest, GQLConnectionArgs, Connection } from '../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../utils'
import searchArticles, {
  SearchArticlesChildProps
} from '../../hocs/withSearchArticles'
import QueryArticleList from '../../gql/queries/articleList.gql'

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

const allArticles = graphql<
  AllArticlesInputProps,
  AllArticlesResponse,
  AllArticlesVariables,
  AllArticlesChildProps
>(QueryArticleList, {
  // name: 'allArticles',
  options: props => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after
        }
      }
    }
  },
  skip: () => !!getSearchKey()
})

export default compose(
  allArticles,
  searchArticles
)
