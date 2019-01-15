import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { Report } from '../../definitions'
import { GQL_FRAGMENT_REPORT } from '../../gql'

const GET_REPORT_DETAIL = gql`
  query ReportDetail($input: ReportInput!) {
    report: oss {
      report(input: $input) {
        ...Report
      }
    }
  }
  ${GQL_FRAGMENT_REPORT}
`

export type ReportDetailResponse = {
  report: {
    report: Report
  }
}
export type ReportDetailInputProps = RouteComponentProps
export type ReportDetailVariables = {
  input: {
    id: string
  }
}
export type ReportDetailChildProps = ChildDataProps<
  ReportDetailInputProps,
  ReportDetailResponse,
  ReportDetailVariables
>

const reportDetail = graphql<
  ReportDetailInputProps,
  ReportDetailResponse,
  ReportDetailVariables,
  ReportDetailChildProps
>(GET_REPORT_DETAIL, {
  options: props => {
    const id = _get(props, 'match.params.id')
    return {
      variables: {
        input: {
          id
        }
      }
    }
  }
})

export default reportDetail
