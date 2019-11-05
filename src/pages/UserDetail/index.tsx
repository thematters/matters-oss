import * as React from 'react'
import { Col, Skeleton, Empty } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../components/ErrorMessage'
import Divider from '../../components/Divider'
import DateTime from '../../components/DateTime'
import Remark from '../../components/Remark'
import DescriptionList from '../../components/DescriptionList'
import UserStateTag from '../../components/User/StateTag'
import UserSetState from '../../components/User/SetState'
import UserRoleTag from '../../components/User/RoleTag'
import UserSetRole from '../../components/User/SetRole'

import withUserDetail, { UserDetailChildProps } from './withUserDetail'
import ArticleDigestList from '../../components/Article/DigestList'
import { SITE_DOMIAN } from '../../constants'
import CommentDigestList from '../../components/Comment/DigestList'
import SetBoost from '../../components/SetBoost'

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
      return <Skeleton active />
    }

    if (!user) {
      return <Empty />
    }

    const userComments = user.commentedArticles.edges
      .map(({ node }) => {
        return node.comments.edges.map(({ node: comment }) => comment)
      })
      .flat()

    return (
      <>
        <DescriptionList col={3} size="large" title="簡介">
          <Description term="姓名">
            <a href={`${SITE_DOMIAN}/@${user.userName}`} target="_blank">
              {user.displayName}
            </a>
          </Description>
          <Description term="Matters ID">
            {user.userName}{' '}
            <small>
              （{user.info.userNameEditable ? '可修改' : '不可修改'}）
            </small>
          </Description>
          <Description term="狀態">
            <UserStateTag state={user.status.state} />
          </Description>
          <Description term="權限">
            <UserRoleTag role={user.status.role} />
          </Description>
          <Description term="註冊時間">
            <DateTime date={user.info.createdAt} />
          </Description>
          <Description term="被追蹤數">{user.followers.totalCount}</Description>
          <Description term="追蹤數">{user.followees.totalCount}</Description>
          <Description term="文章數">{user.status.articleCount}</Description>
          <Description term="評論數">{user.status.commentCount}</Description>
          <Description term="語言">
            {LanguageMap[user.settings.language]}
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="自我描述">
          <Col span={24} style={{ marginBottom: 16 }}>
            {user.info.description}
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="設定">
          <Description term="Boost">
            <SetBoost boost={user.oss.boost} id={user.id} type="User" />
          </Description>

          <Description term="Score">{user.oss.score}</Description>

          <Description term="狀態" col={1}>
            <UserSetState state={user.status.state} id={user.id} />
          </Description>

          <Description term="權限" col={1}>
            <UserSetRole role={user.status.role} id={user.id} />
          </Description>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="備註">
          <Col span={24} lg={12} style={{ marginBottom: 16 }}>
            <Remark id={user.id} type="User" remark={user.remark} />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        <DescriptionList size="large" title="文章">
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={user.articles.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" />

        {/* <DescriptionList size="large" title="評論文章">
          <Col span={24} style={{ marginBottom: 16 }}>
            <ArticleDigestList
              data={user.commentedArticles.edges.map(({ node }) => node)}
            />
          </Col>
        </DescriptionList>
        <Divider size="large" /> */}

        <DescriptionList size="large" title="評論">
          <Col span={24} style={{ marginBottom: 16 }}>
            <CommentDigestList data={userComments} />
          </Col>
        </DescriptionList>
        <Divider size="large" />
      </>
    )
  }
}

export default withUserDetail(UserDetail)
