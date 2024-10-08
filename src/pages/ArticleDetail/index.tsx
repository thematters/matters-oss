import * as React from 'react'
import { Col, Skeleton, Empty } from 'antd'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import UserLink from '../../components/User/Link'
import TagLink from '../../components/Tag/Link'
import Remark from '../../components/Remark'
import DescriptionList from '../../components/DescriptionList'
import ArticleDigestList from '../../components/Article/DigestList'
import ArticleStateTag from '../../components/Article/StateTag'
import ArticleSetState from '../../components/Article/SetState'

import withArticleDetail, { ArticleDetailChildProps } from './withArticleDetail'
import { SITE_DOMIAN } from '../../constants'
import CommentDigestList from '../../components/Comment/DigestList'
import ToggleRecommend from '../../components/Article/ToggleRecommend'
import MarkSpam from '../../components/Article/MarkSpam'
import SetBoost from '../../components/SetBoost'
import ToggleSensitive from '../../components/Article/ToggleSensitive'

const { Description } = DescriptionList

class ArticleDetail extends React.Component<ArticleDetailChildProps> {
  public render() {
    const {
      data: { article, loading, error },
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
              userName={article.author.userName}
              displayName={article.author.displayName}
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
            {article.tags.map((tag) => (
              <TagLink key={tag.id} id={tag.id} content={tag.content} />
            ))}
          </Description>
          <Description term="讚賞數">
            {article.appreciationsReceivedTotal}
          </Description>
          <Description term="站內連結">
            <a
              href={`${SITE_DOMIAN}/@${article.author.userName}/${article.slug}-${article.mediaHash}`}
              target="_blank"
            >
              {article.mediaHash}
            </a>
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="正文">
          <Col span={24} style={{ marginBottom: 16 }}>
            <section dangerouslySetInnerHTML={{ __html: article.content }} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="設定" col={4}>
          <Description term="在「不要錯過」顯示">
            <ToggleRecommend
              checked={article.oss.inRecommendIcymi}
              articleId={article.id}
              type="icymi"
            />
          </Description>

          <Description term="在「熱門文章」顯示">
            <ToggleRecommend
              checked={article.oss.inRecommendHottest}
              articleId={article.id}
              type="hottest"
            />
          </Description>

          <Description term="在「最新發布」顯示">
            <ToggleRecommend
              checked={article.oss.inRecommendNewest}
              articleId={article.id}
              type="newest"
            />
          </Description>

          <Description term="在「檢索結果」顯示">
            <ToggleRecommend
              checked={article.oss.inSearch}
              articleId={article.id}
              type="search"
            />
          </Description>

          <Description term="内容敏感「遮罩正文」">
            <ToggleSensitive
              checked={article.sensitiveByAdmin}
              articleId={article.id}
            />
          </Description>

          <Description term="Boost">
            <SetBoost
              boost={article.oss.boost}
              id={article.id}
              type="Article"
            />
          </Description>

          <Description term="Score">{article.oss.score}</Description>

          <Description term="狀態">
            <ArticleSetState state={article.state} id={article.id} />
          </Description>

          <Description term="垃圾文概率">
            {article.oss.spamStatus.score?.toFixed(3) ?? '計算中'}
          </Description>

          <Description term="標記垃圾文">
            <MarkSpam
              articleId={article.id}
              isSpam={article.oss.spamStatus.isSpam}
            />
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="備註">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <Remark id={article.id} type="Article" remark={article.remark} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="評論">
          <Col span={24} style={{ marginBottom: 16 }}>
            <CommentDigestList
              data={article.comments.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="关联了本文的作品">
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={article.collectedBy.edges.map(({ node }) => node)}
              // pagination={{ totalCount: article.downstreams.totalCount }}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList
          size="large"
          title={`关联了 ${article.collection.totalCount} 篇作品`}
        >
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={article.collection.edges.map(({ node }) => node)}
              // pagination={{ totalCount: article.downstreams.totalCount }}
            />
          </Col>
        </DescriptionList>
      </>
    )
  }
}

export default withArticleDetail(ArticleDetail)
