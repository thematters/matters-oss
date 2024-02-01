import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { GQLConnectionArgs, Connection, ReportDigest } from '../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../utils'
import QueryReportList from '../../gql/queries/reportList.gql'

type AllReportsResponse = {
  oss: {
    reports: Connection<ReportDigest>
  }
}
type AllReportsInputProps = RouteComponentProps
type AllReportsVariables = {
  input: GQLConnectionArgs
}
type AllReportsChildProps = ChildDataProps<
  AllReportsInputProps,
  AllReportsResponse,
  AllReportsVariables
>

export type ReportListChildProps = AllReportsChildProps

const allReports = graphql<
  AllReportsInputProps,
  AllReportsResponse,
  AllReportsVariables,
  AllReportsChildProps
>(QueryReportList, {
  // name: 'allReports',
  options: (props) => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
        },
      },
    }
  },
  skip: () => !!getSearchKey(),
})

export default compose(allReports)
