import { graphql, compose, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import { GQL_FRAGMENT_REPORT, GQL_FRAGMENT_CONNECTION_INFO } from '../../gql'
import { PAGE_SIZE } from '../../constants'
import { Report, GQLConnectionArgs, Connection } from '../../definitions'
import { getSearchKey } from '../../utils'

type ReportsResponse = {
  oss: {
    reports: Connection<Report>
  }
}
type ReportsInputProps = RouteComponentProps & {
  type: 'article' | 'comment'
}
type ReportsVariables = {
  input: GQLConnectionArgs
}
type ReportsChildProps = ChildDataProps<
  ReportsInputProps,
  ReportsResponse,
  ReportsVariables
>
export type ReportListChildProps = ReportsChildProps

const GET_ALL_TAGS = gql`
  query Reports($input: ReportsInput!) {
    oss {
      reports(input: $input) {
        ...ConnectionInfo
        edges {
          node {
            ...Report
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
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
        first: PAGE_SIZE
      }
    }
  }),
  skip: () => !!getSearchKey()
})

export default compose(Reports)
