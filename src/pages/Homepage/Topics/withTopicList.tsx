import { graphql, compose, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import {
  GQL_FRAGMENT_ARTICLE_DIGEST,
  GQL_FRAGMENT_CONNECTION_INFO
} from '../../../gql'
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

const GET_TOPICS = gql`
  query Topics($input: ConnectionArgs!) {
    viewer {
      recommendation {
        topics(input: $input) {
          ...ConnectionInfo
          edges {
            node {
              ...ArticleDigest
            }
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_ARTICLE_DIGEST}
`

const topics = graphql<
  TopicsInputProps,
  TopicsResponse,
  TopicsVariables,
  TopicsChildProps
>(GET_TOPICS, {
  // name: 'topics',
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
  topics,
  searchArticles
)
