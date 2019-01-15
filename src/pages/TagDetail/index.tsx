import * as React from 'react'
import { Col, Tag, Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import DescriptionList from '../../components/DescriptionList'
import ArticleDigestList from '../../components/Article/DigestList'

import withTagDetail, { TagDetailChildProps } from './withTagDetail'

const { Description } = DescriptionList

class TagDetail extends React.Component<TagDetailChildProps> {
  public render() {
    const {
      data: { tag, loading, error }
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
          <Description term="文章數">{tag.count}</Description>
          <Description term="時間">
            <DateTime date={tag.createdAt} />
          </Description>
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
