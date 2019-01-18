import * as React from 'react'
import { Col, Tag, Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import UserLink from '../../components/UserLink'
import Remark from '../../components/Remark'
import DescriptionList from '../../components/DescriptionList'
import ToggleLive from '../../components/Article/ToggleLive'
import TogglePublic from '../../components/Article/TogglePublic'
import ArticleDigestList from '../../components/Article/DigestList'
import ArticleStateTag from '../../components/Article/StateTag'

import withArticleDetail, { ArticleDetailChildProps } from './withArticleDetail'

const { Description } = DescriptionList

class ArticleDetail extends React.Component<ArticleDetailChildProps> {
  public render() {
    const {
      data: { article, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <Skeleton active />
    }

    if (!article) {
      return <Empty />
    }

    return (
      <>
        <DescriptionList size="large" title="簡介">
          <Description term="作者">
            <UserLink
              id={article.author.id}
              userName={article.author.info.userName}
              displayName={article.author.info.displayName}
            />
          </Description>
          <Description term="標題">{article.title}</Description>
          <Description term="slug">{article.slug}</Description>
          <Description term="狀態">
            <ArticleStateTag state={article.state} />
          </Description>
          <Description term="日期">
            <DateTime date={article.createdAt} />
          </Description>
          <Description term="字數">{article.wordCount}</Description>
          <Description term="標籤">
            {article.tags.map(tag => (
              <Tag>{tag.content}</Tag>
            ))}
          </Description>
          <Description term="MAT">{article.MAT}</Description>
          <Description term="IPFS Hash">{article.dataHash}</Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="設定">
          <Description term="白名單">
            <TogglePublic checked={article.public} articleId={article.id} />
          </Description>
          <Description term="LIVE">
            <ToggleLive checked={article.live} articleId={article.id} />
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="備註">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <Remark id={article.id} type="Article" remark={article.remark} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="正文">
          <Col span={24} style={{ marginBottom: 16 }}>
            <section dangerouslySetInnerHTML={{ __html: article.content }} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="上游文章">
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList data={[article.upstream]} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="下游文章">
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={article.downstreams.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
      </>
    )
  }
}

export default withArticleDetail(ArticleDetail)
