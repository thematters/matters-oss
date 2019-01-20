import { graphql, compose, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey } from '../../../utils'
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
import searchArticles, {
  SearchArticlesChildProps
} from '../../../hocs/withSearchArticles'

type MattersChoiceResponse = {
  viewer: {
    recommendation: {
      icymi: Connection<ArticleDigest>
    }
  }
}
type MattersChoiceInputProps = RouteComponentProps
type MattersChoiceVariables = {
  input: GQLConnectionArgs
}
type MattersChoiceChildProps = ChildDataProps<
  MattersChoiceInputProps,
  MattersChoiceResponse,
  MattersChoiceVariables
>
export type MattersChoiceListChildProps = MattersChoiceChildProps &
  SearchArticlesChildProps

const GET_MATTERS_CHOICE = gql`
  query MattersChoice($input: ConnectionArgs!) {
    viewer {
      recommendation {
        icymi(input: $input) {
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

const mattersChoice = graphql<
  MattersChoiceInputProps,
  MattersChoiceResponse,
  MattersChoiceVariables,
  MattersChoiceChildProps
>(GET_MATTERS_CHOICE, {
  // name: 'MattersChoice',
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
  mattersChoice,
  searchArticles
)
