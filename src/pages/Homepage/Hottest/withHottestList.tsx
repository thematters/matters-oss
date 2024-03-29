import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey, getCurrentPaginationFromUrl } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'
import searchArticles, {
  SearchArticlesChildProps,
} from '../../../hocs/withSearchArticles'
import QueryRecommendHottest from '../../../gql/queries/recommendHottest.gql'

import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection,
} from '../../../definitions'

type HottestResponse = {
  viewer: {
    recommendation: {
      hottest: Connection<ArticleDigest>
    }
  }
}
type HottestInputProps = RouteComponentProps
type HottestVariables = {
  input: GQLConnectionArgs
}
type HottestChildProps = ChildDataProps<
  HottestInputProps,
  HottestResponse,
  HottestVariables
>
export type HottestListChildProps = HottestChildProps & SearchArticlesChildProps

const hottest = graphql<
  HottestInputProps,
  HottestResponse,
  HottestVariables,
  HottestChildProps
>(QueryRecommendHottest, {
  // name: 'hottest',
  options: (props) => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
          oss: true,
        },
      },
    }
  },
  skip: () => !!getSearchKey(),
})

export default compose(hottest, searchArticles)
