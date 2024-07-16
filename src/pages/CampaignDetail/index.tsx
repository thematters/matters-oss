import * as React from 'react'
import { Col, Skeleton, Empty, Button } from 'antd'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import DescriptionList from '../../components/DescriptionList'
import CampaignStateTag from '../../components/Campaign/StateTag'
import CampaignSetState from '../../components/Campaign/SetState'
import CampaignUserDigestList from '../../components/Campaign/UserDigestList'

import withCampaignDetail, {
  CampaignDetailChildProps,
} from './withCampaignDetail'
import { PATH, SITE_DOMIAN } from '../../constants'
import ArticleDigestList from '../../components/Article/DigestList'
import LevelTag, { LevelEnum } from '../../components/LevelTag'
import { Link } from 'react-router-dom'

const { Description } = DescriptionList

const sharedStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  height: '60px',
  borderRadius: '1rem',
  background: 'rgba(0, 0, 0, 0.02)',
  color: '#ccc',
}

const Cover = ({ cover }: { cover?: string }) => {
  return cover ? <img src={cover} style={sharedStyles} /> : <div>無</div>
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
        <DescriptionList size="large" title="基本資訊" col={3}>
          <Description term="標題（繁體）">{campaign.nameEn}</Description>
          <Description term="標題（英文）">{campaign.nameEn}</Description>
          <Description term="標題（簡體）">{campaign.nameZhHans}</Description>
        </DescriptionList>

        <DescriptionList size="large" title="簡介" col={2}>
          <Description term="報名期">
            <DateTime date={campaign.applicationPeriod?.start} /> ~{' '}
            <DateTime date={campaign.applicationPeriod?.end} />
          </Description>
          <Description term="活動期">
            <DateTime date={campaign.writingPeriod?.start} /> ~{' '}
            <DateTime date={campaign.writingPeriod?.end} />
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
              <LevelTag level={LevelEnum.NULL}>{s.name}（繁）</LevelTag>
              <LevelTag level={LevelEnum.NULL}>{s.nameEn} (英)</LevelTag>
              <LevelTag level={LevelEnum.NULL}>{s.nameZhHans}（簡）</LevelTag>
              {s.period ? (
                <>
                  <DateTime date={s.period?.start} /> ~{' '}
                  {s.period?.end && <DateTime date={s.period?.end} />}
                </>
              ) : null}
            </Description>
          ))}
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="簡介" col={1}>
          <Description term="繁體">
            <section
              dangerouslySetInnerHTML={{ __html: campaign.description }}
            />
          </Description>

          <Description term="英文">
            <section
              dangerouslySetInnerHTML={{ __html: campaign.descriptionEn }}
            />
          </Description>

          <Description term="簡體">
            <section
              dangerouslySetInnerHTML={{ __html: campaign.descriptionZhHans }}
            />
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="設定" col={4}>
          <Description term="狀態">
            <CampaignSetState campaignState={campaign.state} id={campaign.id} />
          </Description>

          <Description term="活動">
            <Button>
              <Link to={PATH.CAMPAIGN_EDIT.replace(':id', campaign.shortHash)}>
                編輯活動
              </Link>
            </Button>
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="參與者">
          <Col span={24} style={{ marginBottom: 16 }}>
            <CampaignUserDigestList
              campaignId={campaign.id}
              data={campaign.participants.edges.map(
                ({ node, applicationState }) => ({ node, applicationState })
              )}
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
