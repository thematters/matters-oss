import * as React from 'react'
import { Col, Skeleton, Empty, Button, Table } from 'antd'

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
import { Link } from 'react-router-dom'

const { Description } = DescriptionList
const { Column, ColumnGroup } = Table

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
  return cover ? (
    <img src={cover} style={sharedStyles} alt="cover" />
  ) : (
    <div>無</div>
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
        <DescriptionList size="large" title="基本資訊" col={3}>
          <Description term="標題（繁體）">{campaign.name}</Description>
          <Description term="標題（英文）">{campaign.nameEn}</Description>
          <Description term="標題（簡體）">{campaign.nameZhHans}</Description>
        </DescriptionList>

        <DescriptionList size="large" title="簡介" col={2}>
          <Description term="報名期">
            <DateTime date={campaign.applicationPeriod?.start} dateOnly /> ~{' '}
            <DateTime date={campaign.applicationPeriod?.end} dateOnly />
          </Description>
          <Description term="活動期">
            <DateTime date={campaign.writingPeriod?.start} dateOnly /> ~{' '}
            <DateTime date={campaign.writingPeriod?.end} dateOnly />
          </Description>

          <Description term="站內連結">
            <a
              href={`${SITE_DOMIAN}/e/${campaign.shortHash}`}
              target="_blank"
              rel="noreferrer"
            >
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

        <DescriptionList size="large" title="活動公告">
          <Description term="规则公告連結">
            <a href={campaign.link} target="_blank" rel="noreferrer">
              {campaign.link}
            </a>
          </Description>

          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList data={[...campaign.announcements].reverse()} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="投稿選項" col={1}>
          <Table bordered dataSource={campaign.stages}>
            <ColumnGroup title="繁">
              <Column title="名稱" dataIndex="name" key="name" />
              <Column title="簡介" dataIndex="description" key="description" />
            </ColumnGroup>
            <ColumnGroup title="英">
              <Column title="名稱" dataIndex="nameEn" key="nameEn" />
              <Column
                title="簡介"
                dataIndex="descriptionEn"
                key="descriptionEn"
              />
            </ColumnGroup>
            <ColumnGroup title="簡">
              <Column title="名稱" dataIndex="nameZhHans" key="nameZhHans" />
              <Column
                title="簡介"
                dataIndex="descriptionZhHans"
                key="descriptionZhHans"
              />
            </ColumnGroup>
            <Column
              title="日期"
              dataIndex="period"
              key="period"
              width="10"
              render={(period) => (
                <>
                  <DateTime date={period?.start} dateOnly /> ~{' '}
                  <DateTime date={period?.end} dateOnly />
                </>
              )}
            />
          </Table>
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
                ({ node, application }) => ({ node, application })
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
