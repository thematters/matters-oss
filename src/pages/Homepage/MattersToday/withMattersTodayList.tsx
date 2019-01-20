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

type MattersTodayResponse = {
  oss: {
    today: Connection<ArticleDigest>
  }
}
type MattersTodayInputProps = RouteComponentProps
type MattersTodayVariables = {
  input: GQLConnectionArgs
}
type MattersTodayChildProps = ChildDataProps<
  MattersTodayInputProps,
  MattersTodayResponse,
  MattersTodayVariables
>
export type MattersTodayListChildProps = MattersTodayChildProps &
  SearchArticlesChildProps

const GET_MATTERS_TODAY = gql`
  query MattersToday($input: ConnectionArgs!) {
    oss {
      today(input: $input) {
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

const mattersToday = graphql<
  MattersTodayInputProps,
  MattersTodayResponse,
  MattersTodayVariables,
  MattersTodayChildProps
>(GET_MATTERS_TODAY, {
  // name: 'today',
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
  mattersToday,
  searchArticles
)
