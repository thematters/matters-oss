import * as React from 'react'
import { Col, Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import DescriptionList from '../../components/DescriptionList'
import ArticleDigestList from '../../components/Article/DigestList'
import CommentDigestList from '../../components/Comment/DigestList'
import Remark from '../../components/Remark'

import withReportDetail, { ReportDetailChildProps } from './withReportDetail'
import UserLink from '../../components/User/Link'

const { Description } = DescriptionList

class ReportDetail extends React.Component<ReportDetailChildProps> {
  public render() {
    const {
      data: { report, loading, error },
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
      id,
      comment,
      article,
      user,
      contact,
      description,
      category,
      assets,
      createdAt,
      remark,
    } = report.report

    return (
      <>
        <DescriptionList size="large" title="簡介">
          {user && (
            <Description term="舉報人">
              <UserLink
                id={user.id}
                userName={user.userName}
                displayName={user.displayName}
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

        <DescriptionList size="large" title="備註">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <Remark id={id} type="Report" remark={remark} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="附件">
          {assets.map((asset) => (
            <Col span={4} style={{ marginBottom: 16 }}>
              <a href={asset} target="_blank">
                <img src={asset} style={{ maxWidth: '100%' }} />
              </a>
            </Col>
          ))}
        </DescriptionList>
        <Divider size="large" />

        {article && (
          <DescriptionList size="large" title="被舉報文章">
            <Col span={24} style={{ marginBottom: 16 }}>
              <ArticleDigestList data={[article]} />
            </Col>
          </DescriptionList>
        )}
        {comment && (
          <DescriptionList size="large" title="被舉報評論">
            <Col span={24} style={{ marginBottom: 16 }}>
              <CommentDigestList data={[comment]} />
            </Col>
          </DescriptionList>
        )}
        <Divider size="large" />
      </>
    )
  }
}

export default withReportDetail(ReportDetail)
