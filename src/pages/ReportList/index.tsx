import React from 'react'

import ErrorMessage from '../../components/ErrorMessage'
import ReportDigestList from './ReportDigestList'
import withReportList, { ReportListChildProps } from '././withReportList'

import { ReportDigest } from '../../definitions'

class ReportList extends React.Component<ReportListChildProps> {
  state: Readonly<{ inputCommentId: string }> = {
    inputCommentId: '',
  }

  private _renderContent() {
    const {
      data: { oss, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: Array<ReportDigest> = []
    let totalCount: number = 0

    if (oss) {
      listData = oss.reports.edges.map(({ node }) => node)
      totalCount = oss.reports.totalCount
    }

    return (
      <ReportDigestList
        data={listData}
        loading={loading}
        pagination={{ totalCount, fetchMore, variables }}
      />
    )
  }

  public render() {
    return <>{this._renderContent()}</>
  }
}

export default withReportList(ReportList)
