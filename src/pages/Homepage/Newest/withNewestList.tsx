import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../../constants'
import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection
} from '../../../definitions'
import { getSearchKey } from '../../../utils'
import searchArticles, {
  SearchArticlesChildProps
} from '../../../hocs/withSearchArticles'
import QueryRecommendNewest from '../../../gql/queries/recommendNewest.gql'

type NewestResponse = {
  viewer: {
    recommendation: {
      newest: Connection<ArticleDigest>
    }
  }
}
type NewestInputProps = RouteComponentProps
type NewestVariables = {
  input: GQLConnectionArgs
}
type NewestChildProps = ChildDataProps<
  NewestInputProps,
  NewestResponse,
  NewestVariables
>
export type NewestListChildProps = NewestChildProps & SearchArticlesChildProps

const newest = graphql<
  NewestInputProps,
  NewestResponse,
  NewestVariables,
  NewestChildProps
>(QueryRecommendNewest, {
  options: props => ({
    // name: 'Newest',
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        first: PAGE_SIZE,
        oss: true
      }
    }
  }),
  skip: () => !!getSearchKey()
})

export default compose(
  newest,
  searchArticles
)
