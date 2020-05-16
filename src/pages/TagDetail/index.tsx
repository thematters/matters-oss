import * as React from 'react'
import { Col, Tag, Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import Remark from '../../components/Remark'
import DescriptionList from '../../components/DescriptionList'
import ArticleDigestList from '../../components/Article/DigestList'
import TagStateTag from '../../components/Tag/StateTag'

import withTagDetail, { TagDetailChildProps } from './withTagDetail'
import SetBoost from '../../components/SetBoost'

const { Description } = DescriptionList

class TagDetail extends React.Component<TagDetailChildProps> {
  public render() {
    const {
      data: { tag, loading, error },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <Skeleton active />
    }

    if (!tag) {
      return <Empty />
    }

    return (
      <>
        <DescriptionList size="large" title="簡介">
          <Description term="標籤">
            <Tag>{tag.content}</Tag>
          </Description>
          <Description term="描述">{tag.description}</Description>
          <Description term="狀態">
            <TagStateTag deleted={tag.deleted} />
          </Description>
          <Description term="文章數">{tag.articles.totalCount}</Description>
          <Description term="時間">
            <DateTime date={tag.createdAt} />
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="設定">
          <Description term="Boost">
            <SetBoost boost={tag.oss.boost} id={tag.id} type="Tag" />
          </Description>

          <Description term="Score">{tag.oss.score}</Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="備註">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <Remark id={tag.id} type="Tag" remark={tag.remark} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="文章">
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={tag.articles.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
      </>
    )
  }
}

export default withTagDetail(TagDetail)
