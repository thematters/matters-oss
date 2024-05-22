import * as React from 'react'
import { Skeleton, Tag, Col } from 'antd'

import withIcymiTopicDetail, {
  IcymiTopicDetailChildProps,
} from './withIcymiTopic'
import SetTitle from '../../components/IcymiTopic/SetTitle'
import SetNote from '../../components/IcymiTopic/SetNote'
import SetPinAmount from '../../components/IcymiTopic/SetPinAmount'
import AddArticle from '../../components/IcymiTopic/AddArticle'
import ArticleList from '../../components/IcymiTopic/ArticleList'
import ActionButton from '../../components/IcymiTopic/ActionButton'
import ErrorMessage from '../../components/ErrorMessage'
import DescriptionList from '../../components/DescriptionList'
import DateTime from '../../components/DateTime'

const COLOR = {
  editing: 'gold',
  published: 'green',
  archived: 'grey',
}

const COPY = {
  editing: '編輯中',
  published: '已發佈',
  archived: '已下架',
}

class IcymiTopicDetail extends React.Component<IcymiTopicDetailChildProps> {
  public render() {
    const {
      data: { node, loading, error },
    } = this.props

    if (loading) {
      return <Skeleton active />
    }

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <>
        <DescriptionList size="small" title="" gutter={32}>
          <Col span={4} lg={6} style={{ marginBottom: 16 }}>
            <Tag color={COLOR[node!.state]}>{COPY[node!.state]}</Tag>
          </Col>
          <Col
            span={20}
            lg={6}
            style={{
              marginBottom: 16,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            {node!.state !== 'editing' && (
              <>
                <span>發佈：</span>
                <DateTime date={node!.publishedAt} />
              </>
            )}
            {node!.state === 'archived' && (
              <>
                <span style={{ marginLeft: 16 }}>下架：</span>
                <DateTime date={node!.archivedAt} />
              </>
            )}
          </Col>
        </DescriptionList>
        <DescriptionList size="large" title="專題名稱">
          <Col span={24} lg={6} style={{ marginBottom: 16 }}>
            <SetTitle
              id={node!.id}
              title={node?.title ?? ''}
              disabled={node!.state === 'archived'}
            />
          </Col>
        </DescriptionList>
        <DescriptionList size="large" title="編輯按語">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <SetNote
              id={node!.id}
              note={node?.note ?? ''}
              disabled={node!.state === 'archived'}
            />
          </Col>
        </DescriptionList>
        <DescriptionList size="large" title="">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <SetPinAmount
              id={node!.id}
              pinAmount={node?.pinAmount ?? 3}
              disabled={node!.state === 'archived'}
            />
          </Col>
        </DescriptionList>
        <DescriptionList size="large" title="文章">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <AddArticle
              id={node!.id}
              articleIds={node?.articles.map(({ id }) => id) ?? []}
              disabled={node!.state === 'archived'}
            />
          </Col>
        </DescriptionList>
        <DescriptionList size="small" title="">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <ArticleList
              id={node!.id}
              articles={node?.articles ?? []}
              disabled={node!.state === 'archived'}
            />
          </Col>
        </DescriptionList>
        <DescriptionList size="large" title="">
          <Col span={12} lg={1} style={{ marginBottom: 16 }}>
            {node!.state === 'editing' && (
              <ActionButton
                id={node!.id}
                currentState={node!.state as 'editing'}
                newState={'archived'}
              />
            )}
            {node!.state === 'published' && (
              <ActionButton
                id={node!.id}
                currentState={node!.state as 'published'}
                newState={'archived'}
              />
            )}
          </Col>
          <Col span={12} lg={1} style={{ marginBottom: 16 }}>
            {node!.state === 'editing' && (
              <ActionButton
                id={node!.id}
                currentState={node!.state as 'editing'}
                newState={'published'}
                disabled={node!.articles.length < node!.pinAmount}
              />
            )}
          </Col>
        </DescriptionList>
      </>
    )
  }
}

export default withIcymiTopicDetail(IcymiTopicDetail)
