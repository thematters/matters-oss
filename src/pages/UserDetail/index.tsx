import * as React from 'react'
import { Col } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import DescriptionList from '../../components/DescriptionList'
import InvitationList from '../../components/User/InvitationList'
import UserStateTag from '../../components/User/StateTag'

import withUserDetail, { UserDetailChildProps } from './withUserDetail'
import ArticleDigestList from '../../components/Article/DigestList'

const { Description } = DescriptionList
const LanguageMap = {
  en: 'English',
  zh_hant: '繁體中文',
  zh_hans: '簡體中文'
}

class UserDetail extends React.Component<UserDetailChildProps> {
  public render() {
    const {
      data: { user, loading, error }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <span>loading</span>
    }

    if (!user) {
      return <span>empty</span>
    }

    return (
      <>
        <DescriptionList col={3} size="large" title="簡介">
          <Description term="姓名">{user.info.displayName}</Description>
          <Description term="Matters ID">
            {user.info.userName}{' '}
            <small>
              （{user.info.userNameEditable ? '可修改' : '不可修改'}）
            </small>
          </Description>
          <Description term="電子信箱">
            {user.info.email}{' '}
            <small>（{user.info.emailVerified ? '已認證' : '未認證'}）</small>
          </Description>
          <Description term="狀態">
            <UserStateTag state={user.status.state} />
          </Description>
          <Description term="註冊時間">
            <DateTime date={user.info.createdAt} />
          </Description>
          <Description term="被追蹤數">{user.status.followerCount}</Description>
          <Description term="追蹤數">{user.status.followeeCount}</Description>
          <Description term="MAT 數">{user.status.MAT.total}</Description>
          <Description term="文章數">{user.status.articleCount}</Description>
          <Description term="評論數">{user.status.commentCount}</Description>
          <Description term="收藏數">
            {user.status.subscriptionCount}
          </Description>
          <Description term="語言">
            {LanguageMap[user.settings.language]}
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="設定" />
        <Divider size="large" />

        <DescriptionList size="large" title="自我描述" col={1}>
          <Col span={24} style={{ marginBottom: 16 }}>
            {user.info.description}
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="發表文章" col={1}>
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={user.articles.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="評論文章" col={1}>
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={user.commentedArticles.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="收藏文章" col={1}>
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={user.subscriptions.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="邀請紀錄" col={1}>
          <Col span={24} style={{ marginBottom: 16 }}>
            <InvitationList
              //@ts-ignore
              data={
                user.status.invitation.sent.edges &&
                user.status.invitation.sent.edges.map(({ node }) => node)
              }
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />
      </>
    )
  }
}

export default withUserDetail(UserDetail)
