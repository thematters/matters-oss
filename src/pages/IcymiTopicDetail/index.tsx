import * as React from 'react'
import { Skeleton, Tag, Col } from 'antd'

import withIcymiTopicDetail, {
  IcymiTopicDetailChildProps,
} from './withIcymiTopic'
import SetTitle from '../../components/IcymiTopic/SetTitle'
import SetNote from '../../components/IcymiTopic/SetNote'
import ErrorMessage from '../../components/ErrorMessage'
import DescriptionList from '../../components/DescriptionList'

class IcymiTopicDetail extends React.Component<IcymiTopicDetailChildProps> {
  private onChangeNode = (str: string) => {
    console.log('Content change:', str)
  }

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

    console.log(node)

    return (
      <>
        <DescriptionList size="small" title="" gutter={32}>
          <Col style={{ marginBottom: 16 }}>
            <Tag color="gold">{node?.state}</Tag>
          </Col>
        </DescriptionList>
        <DescriptionList size="large" title="專題名稱">
          <Col span={24} lg={6} style={{ marginBottom: 16 }}>
            <SetTitle id={node!.id} title={node?.title ?? ''} />
          </Col>
        </DescriptionList>
        <DescriptionList size="large" title="編輯按語">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <SetNote id={node!.id} note={node?.note ?? ''} />
          </Col>
        </DescriptionList>
      </>
    )
  }
}

export default withIcymiTopicDetail(IcymiTopicDetail)
