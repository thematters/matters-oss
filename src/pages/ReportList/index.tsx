import * as React from 'react'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import ReportDigestList from '../../components/Report/DigestList'
import withReportList from './withReportList'

import { Report } from '../../definitions'
import { ReportsChildProps } from './type'

class ReportsList extends React.Component<ReportsChildProps> {
  get isArticle() {
    return this.props.type === 'article'
  }
  get isComment() {
    return this.props.type === 'comment'
  }

  private _renderContent() {
    const {
      data: { oss, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return (
        <ReportDigestList
          isArticle={this.isArticle}
          isComment={this.isComment}
          data={[]}
          loading
        />
      )
    }

    let reportTableData: Report[] = []
    if (oss && oss.reports) {
      reportTableData = oss.reports.edges.map(({ node }) => node)
    }
    return (
      <ReportDigestList
        isArticle={this.isArticle}
        isComment={this.isComment}
        data={reportTableData}
      />
    )
  }

  public render() {
    return <>{this._renderContent()}</>
  }
}

export default withReportList(ReportsList)
