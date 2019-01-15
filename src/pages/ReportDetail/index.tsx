import * as React from 'react'
import { Col, Tag, Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import DescriptionList from '../../components/DescriptionList'
import ArticleDigestList from '../../components/Article/DigestList'

import withReportDetail, { ReportDetailChildProps } from './withReportDetail'
import UserLink from '../../components/UserLink'

const { Description } = DescriptionList

class TagDetail extends React.Component<ReportDetailChildProps> {
  public render() {
    const {
      data: { report, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <Skeleton active />
    }

    if (!report) {
      return <Empty />
    }

    const {
      comment,
      article,
      user,
      contact,
      description,
      category,
      assets,
      createdAt
    } = report.report

    return (
      <>
        <DescriptionList size="large" title="簡介">
          {user && (
            <Description term="舉報人">
              <UserLink
                id={user.id}
                userName={user.info.userName}
                displayName={user.info.displayName}
              />
            </Description>
          )}
          <Description term="舉報原因">{category}</Description>
          <Description term="聯繫方式">{contact}</Description>
          <Description term="時間">
            <DateTime date={createdAt} />
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="舉報描述">
          <Col span={24} style={{ marginBottom: 16 }}>
            <section dangerouslySetInnerHTML={{ __html: description }} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        {article && (
          <DescriptionList size="large" title="被舉報文章">
            <Col span={24} style={{ marginBottom: 16 }}>
              <ArticleDigestList data={[article]} />
            </Col>
          </DescriptionList>
        )}
        {/* {comment && (
          <DescriptionList size="large" title="被舉報評論">
            <Col span={24} style={{ marginBottom: 16 }}>
              <CommentDigestList data={[comment]} />
            </Col>
          </DescriptionList>
        )} */}
        <Divider size="large" />
      </>
    )
  }
}

export default withReportDetail(TagDetail)
