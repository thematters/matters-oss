import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { Report, GQLConnectionArgs, Connection } from '../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../utils'
import QueryReportList from '../../gql/queries/reportList.gql'

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

const Reports = graphql<
  ReportsInputProps,
  ReportsResponse,
  ReportsVariables,
  ReportsChildProps
>(QueryReportList, {
  // name: 'reports',
  options: props => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
          article: props.type === 'article',
          comment: props.type === 'comment'
        }
      }
    }
  },
  skip: () => !!getSearchKey()
})

export default compose(Reports)
