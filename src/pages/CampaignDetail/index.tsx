import * as React from 'react'
import { Col, Skeleton, Empty } from 'antd'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import DescriptionList from '../../components/DescriptionList'
import CampaignStateTag from '../../components/Campaign/StateTag'
import CampaignSetState from '../../components/Campaign/SetState'

import withCampaignDetail, {
  CampaignDetailChildProps,
} from './withCampaignDetail'
import { SITE_DOMIAN } from '../../constants'
import UserDigestList from '../../components/User/DigestList'
import ArticleDigestList from '../../components/Article/DigestList'
import LevelTag, { LevelEnum } from '../../components/LevelTag'

const { Description } = DescriptionList

const sharedStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  width: '100%',
  height: '60px',
  borderRadius: '1rem',
  background: 'rgba(0, 0, 0, 0.02)',
  color: '#ccc',
}

const Cover = ({ cover }: { cover?: string }) => {
  return cover ? (
    <img src={cover} style={sharedStyles} />
  ) : (
    <div style={sharedStyles}>未上傳</div>
  )
}

class CampaignDetail extends React.Component<CampaignDetailChildProps> {
  public render() {
    const {
      data: { campaign, loading, error },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <Skeleton active />
    }

    if (!campaign) {
      return <Empty />
    }

    return (
      <>
        <DescriptionList size="large" title="簡介" col={2}>
          <Description term="報名期">
            <DateTime date={campaign.applicationPeriod.start} /> ~
            <DateTime date={campaign.applicationPeriod.end} />
          </Description>
          <Description term="活動期">
            <DateTime date={campaign.writingPeriod.start} /> ~
            <DateTime date={campaign.writingPeriod.end} />
          </Description>

          <Description term="活動公告">
            <a href={campaign.link} target="_blank">
              {campaign.link}
            </a>
          </Description>

          <Description term="站內連結">
            <a href={`${SITE_DOMIAN}/e/${campaign.shortHash}`} target="_blank">
              {`${SITE_DOMIAN}/e/${campaign.shortHash}`}
            </a>
          </Description>

          <Description term="狀態">
            <CampaignStateTag state={campaign.state} />
          </Description>

          <Description term="封面圖片">
            <Cover cover={campaign.cover} />
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="投稿選項" col={1}>
          {campaign.stages.map((s) => (
            <Description term="" key={s.id}>
              <LevelTag level={LevelEnum.NULL}>{s.name}</LevelTag>
              {s.period ? (
                <>
                  (<DateTime date={s.period?.start} /> ~{' '}
                  {s.period?.end && <DateTime date={s.period?.end} />})
                </>
              ) : null}
            </Description>
          ))}
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="簡介">
          <Col span={24} style={{ marginBottom: 16 }}>
            <section
              dangerouslySetInnerHTML={{ __html: campaign.description }}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="設定" col={4}>
          <Description term="狀態">
            <CampaignSetState campaignState={campaign.state} id={campaign.id} />
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="參與者">
          <Col span={24} style={{ marginBottom: 16 }}>
            <UserDigestList
              data={campaign.participants.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="文章">
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={campaign.articles.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />
      </>
    )
  }
}

export default withCampaignDetail(CampaignDetail)
