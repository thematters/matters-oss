import * as React from 'react'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import ReportDigestList from '../../components/Report/DigestList'
import withReportList, { ReportListChildProps } from './withReportList'

import { Report } from '../../definitions'

class ReportsList extends React.Component<ReportListChildProps> {
  get isArticle() {
    return this.props.type === 'article'
  }
  get isComment() {
    return this.props.type === 'comment'
  }

  private _renderContent() {
    const {
      data: { oss, loading, error, fetchMore, variables }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: Report[] = []
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
        isArticle={this.isArticle}
        isComment={this.isComment}
      />
    )
  }

  public render() {
    return <>{this._renderContent()}</>
  }
}

export default withReportList(ReportsList)
