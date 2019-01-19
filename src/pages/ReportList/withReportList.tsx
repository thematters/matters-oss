import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../utils'
import {
  ReportsInputProps,
  ReportsResponse,
  ReportsVariables,
  ReportsChildProps
} from './type'
import { GQL_FRAGMENT_REPORT } from '../../gql'

const GET_ALL_TAGS = gql`
  query Reports($input: ReportsInput!) {
    oss {
      reports(input: $input) {
        edges {
          node {
            ...Report
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_REPORT}
`

const Reports = graphql<
  ReportsInputProps,
  ReportsResponse,
  ReportsVariables,
  ReportsChildProps
>(GET_ALL_TAGS, {
  // name: 'reports',
  options: props => ({
    variables: {
      input: {
        article: props.type === 'article',
        comment: props.type === 'comment',
        first: 10
      }
    }
  }),
  skip: () => !!getSearchKey()
})

export default compose(Reports)
