import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import {
  ArticleDigest,
  GQLOSSArticlesInput,
  Connection,
} from '../../definitions'
import {
  getSearchKey,
  getFilterSpamKey,
  getCurrentPaginationFromUrl,
} from '../../utils'
import searchArticles, {
  SearchArticlesChildProps,
} from '../../hocs/withSearchArticles'
import QueryArticleList from '../../gql/queries/articleList.gql'

type AllArticlesResponse = {
  oss: {
    articles: Connection<ArticleDigest>
  }
}
type AllArticlesInputProps = RouteComponentProps
type AllArticlesVariables = {
  input: GQLOSSArticlesInput
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
  options: (props) => {
    const currentPagination = getCurrentPaginationFromUrl()
    const filterSpam = getFilterSpamKey()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
          filter: {
            isSpam: filterSpam,
          },
        },
      },
    }
  },
  skip: () => !!getSearchKey(),
})

export default compose(allArticles, searchArticles)
