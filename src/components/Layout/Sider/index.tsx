import * as React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'

import Divider from '../../../components/Divider'

import { PATH, PAGE_TITLE } from '../../../constants'
import LOGO_URL from '../../../assets/logo.svg'
import { ViewerContext } from '../ViewerProvider'

const { SubMenu } = Menu

export const Sider: React.FC<RouteComponentProps> = ({ location }) => {
  const viewer = React.useContext(ViewerContext)

  if (!viewer.isAuthed) {
    return null
  }

  return (
    <AntLayout.Sider
      theme="light"
      width="250"
      breakpoint="lg"
      collapsedWidth="0"
      collapsible
    >
      <Link to={PATH.HOMEPAGE}>
        <div className="logo" style={{ padding: '24px 24px 0' }}>
          <img src={LOGO_URL} alt="logo" />
          <strong>&nbsp; Matters OSS</strong>
        </div>
      </Link>
      <Divider />
      <Menu
        className="c-menu"
        selectable={false}
        mode="inline"
        inlineCollapsed={false}
        selectedKeys={[location.pathname]}
        defaultOpenKeys={['homepage', 'user', 'article', 'comment']}
      >
        <SubMenu
          key="homepage"
          title={<strong>{PAGE_TITLE[PATH.HOMEPAGE]}</strong>}
        >
          <Menu.Item key={PATH.HOMEPAGE_HOTTEST}>
            <Link to={PATH.HOMEPAGE_HOTTEST}>
              {PAGE_TITLE[PATH.HOMEPAGE_HOTTEST]}
            </Link>
          </Menu.Item>
          <Menu.Item key={PATH.HOMEPAGE_NEWEST}>
            <Link to={PATH.HOMEPAGE_NEWEST}>
              {PAGE_TITLE[PATH.HOMEPAGE_NEWEST]}
            </Link>
          </Menu.Item>
          <Menu.Item key={PATH.HOMEPAGE_ICYMI}>
            <Link to={PATH.HOMEPAGE_ICYMI}>
              {PAGE_TITLE[PATH.HOMEPAGE_ICYMI]}
            </Link>
          </Menu.Item>
          <Menu.Item key={PATH.HOMEPAGE_ICYMI_TOPICS}>
            <Link to={PATH.HOMEPAGE_ICYMI_TOPICS}>
              {PAGE_TITLE[PATH.HOMEPAGE_ICYMI_TOPICS]}
            </Link>
          </Menu.Item>
          <Menu.Item key={PATH.HOMEPAGE_AUTHORS}>
            <Link to={PATH.HOMEPAGE_AUTHORS}>
              {PAGE_TITLE[PATH.HOMEPAGE_AUTHORS]}
            </Link>
          </Menu.Item>
          <Menu.Item key={PATH.HOMEPAGE_TAGS}>
            <Link to={PATH.HOMEPAGE_TAGS}>
              {PAGE_TITLE[PATH.HOMEPAGE_TAGS]}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="user" title={<strong>用戶</strong>}>
          <Menu.Item key={PATH.USER_LIST}>
            <Link to={PATH.USER_LIST}>{PAGE_TITLE[PATH.USER_LIST]}</Link>
          </Menu.Item>
          <Menu.Item key={PATH.RESTRICTED_USER_LIST}>
            <Link to={PATH.RESTRICTED_USER_LIST}>
              {PAGE_TITLE[PATH.RESTRICTED_USER_LIST]}
            </Link>
          </Menu.Item>
          <Menu.Item key={PATH.BADGED_USER_LIST}>
            <Link to={PATH.BADGED_USER_LIST}>
              {PAGE_TITLE[PATH.BADGED_USER_LIST]}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="article" title={<strong>文章</strong>}>
          <Menu.Item key={PATH.ARTICLE_LIST}>
            <Link to={PATH.ARTICLE_LIST}>{PAGE_TITLE[PATH.ARTICLE_LIST]}</Link>
          </Menu.Item>
          <Menu.Item key={PATH.TAG_LIST}>
            <Link to={PATH.TAG_LIST}>{PAGE_TITLE[PATH.TAG_LIST]}</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="comment" title={<strong>評論</strong>}>
          <Menu.Item key={PATH.COMMENT_LIST}>
            <Link to={PATH.COMMENT_LIST}>{PAGE_TITLE[PATH.COMMENT_LIST]}</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="freewrite" title={<strong>自由寫</strong>}>
          <Menu.Item key={PATH.CAMPAIGN_LIST}>
            <Link to={PATH.CAMPAIGN_LIST}>
              {PAGE_TITLE[PATH.CAMPAIGN_LIST]}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="report" title={<strong>報告</strong>}>
          <Menu.Item key={PATH.REPORT_LIST}>
            <Link to={PATH.REPORT_LIST}>{PAGE_TITLE[PATH.REPORT_LIST]}</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="system" title={<strong>系統設定</strong>}>
          <Menu.Item key={PATH.ANNOUNCEMENTS}>
            <Link to={PATH.ANNOUNCEMENTS}>
              {PAGE_TITLE[PATH.ANNOUNCEMENTS]}
            </Link>
          </Menu.Item>

          <Menu.Item key={PATH.BLOCK_LIST}>
            <Link to={PATH.BLOCK_LIST}>{PAGE_TITLE[PATH.BLOCK_LIST]}</Link>
          </Menu.Item>

          <Menu.Item key={PATH.BLOCK_LIST_DOMAIN}>
            <Link to={PATH.BLOCK_LIST_DOMAIN}>
              {PAGE_TITLE[PATH.BLOCK_LIST_DOMAIN]}
            </Link>
          </Menu.Item>

          <Menu.Item key={PATH.FEATURE_FLAG}>
            <Link to={PATH.FEATURE_FLAG}>{PAGE_TITLE[PATH.FEATURE_FLAG]}</Link>
          </Menu.Item>

          <Menu.Item key={PATH.SEEDING_USER_LIST}>
            <Link to={PATH.SEEDING_USER_LIST}>
              {PAGE_TITLE[PATH.SEEDING_USER_LIST]}
            </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </AntLayout.Sider>
  )
}

export default withRouter(Sider)
