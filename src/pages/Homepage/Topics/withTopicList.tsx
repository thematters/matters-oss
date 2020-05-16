import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../../constants'
import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection,
} from '../../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../../utils'
import searchArticles, {
  SearchArticlesChildProps,
} from '../../../hocs/withSearchArticles'
import QueryRecommendTopics from '../../../gql/queries/recommendTopics.gql'

type TopicsResponse = {
  viewer: {
    recommendation: {
      topics: Connection<ArticleDigest>
    }
  }
}
type TopicsInputProps = RouteComponentProps
type TopicsVariables = {
  input: GQLConnectionArgs
}
type TopicsChildProps = ChildDataProps<
  TopicsInputProps,
  TopicsResponse,
  TopicsVariables
>
export type TopicsListChildProps = TopicsChildProps & SearchArticlesChildProps

const topics = graphql<
  TopicsInputProps,
  TopicsResponse,
  TopicsVariables,
  TopicsChildProps
>(QueryRecommendTopics, {
  // name: 'topics',
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

export default compose(topics, searchArticles)
