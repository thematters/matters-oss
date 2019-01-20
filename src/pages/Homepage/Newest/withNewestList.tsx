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

const GET_NEWEST = gql`
  query Newest($input: ConnectionArgs!) {
    viewer {
      recommendation {
        newest(input: $input) {
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

const newest = graphql<
  NewestInputProps,
  NewestResponse,
  NewestVariables,
  NewestChildProps
>(GET_NEWEST, {
  options: props => ({
    // name: 'Newest',
    variables: {
      input: {
        first: PAGE_SIZE
      }
    }
  }),
  skip: () => !!getSearchKey()
})

export default compose(
  newest,
  searchArticles
)
