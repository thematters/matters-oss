import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { ArticleDigest, GQLConnectionArgs, Connection } from '../../definitions'
import { getSearchKey } from '../../utils'
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
  options: props => ({
    notifyOnNetworkStatusChange: true,
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
