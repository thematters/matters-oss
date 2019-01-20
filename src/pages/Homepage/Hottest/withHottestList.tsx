import { graphql, compose, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey } from '../../../utils'
import {
  GQL_FRAGMENT_ARTICLE_DIGEST,
  GQL_FRAGMENT_CONNECTION_INFO
} from '../../../gql'
import { PAGE_SIZE } from '../../../constants'
import searchArticles, {
  SearchArticlesChildProps
} from '../../../hocs/withSearchArticles'

import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection
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

const GET_HOTTEST = gql`
  query Hottest($input: ConnectionArgs!) {
    viewer {
      recommendation {
        hottest(input: $input) {
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

const hottest = graphql<
  HottestInputProps,
  HottestResponse,
  HottestVariables,
  HottestChildProps
>(GET_HOTTEST, {
  // name: 'hottest',
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
  hottest,
  searchArticles
)
