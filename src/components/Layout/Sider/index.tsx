import * as React from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'

import Divider from '../../../components/Divider'

import { PATH, PAGE_TITLE, STORE_JWT_TOKEN } from '../../../constants'
import LOGO_URL from '../../../assets/logo.svg'

const { SubMenu } = Menu

const Sider: React.FunctionComponent<RouteComponentProps> = ({ location }) => {
  const isAuthenticated = window.localStorage.getItem(STORE_JWT_TOKEN)

  if (!isAuthenticated) {
    return null
  }

  return (
    <AntLayout.Sider
      theme="light"
      width="250"
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Link to={PATH.HOMEPAGE}>
        <div className="logo" style={{ padding: '24px 24px 0' }}>
          <img src={LOGO_URL} />
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
        defaultOpenKeys={['homepage', 'user', 'article', 'comment', 'report']}
      >
        <SubMenu
          mode="inline"
          key="homepage"
          title={<strong>{PAGE_TITLE[PATH.HOMEPAGE]}</strong>}
        >
          <Menu.Item key={PATH.HOMEPAGE_MATTERS_TODAY}>
            <Link to={PATH.HOMEPAGE_MATTERS_TODAY}>
              {PAGE_TITLE[PATH.HOMEPAGE_MATTERS_TODAY]}
            </Link>
          </Menu.Item>
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
          <Menu.Item key={PATH.HOMEPAGE_TOPICS}>
            <Link to={PATH.HOMEPAGE_TOPICS}>
              {PAGE_TITLE[PATH.HOMEPAGE_TOPICS]}
            </Link>
          </Menu.Item>
          <Menu.Item key={PATH.HOMEPAGE_MATTERS_CHOICE}>
            <Link to={PATH.HOMEPAGE_MATTERS_CHOICE}>
              {PAGE_TITLE[PATH.HOMEPAGE_MATTERS_CHOICE]}
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

        <SubMenu mode="inline" key="user" title={<strong>用戶</strong>}>
          <Menu.Item key={PATH.USER_LIST}>
            <Link to={PATH.USER_LIST}>{PAGE_TITLE[PATH.USER_LIST]}</Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu mode="inline" key="article" title={<strong>文章</strong>}>
          <Menu.Item key={PATH.ARTICLE_LIST}>
            <Link to={PATH.ARTICLE_LIST}>{PAGE_TITLE[PATH.ARTICLE_LIST]}</Link>
          </Menu.Item>
          <Menu.Item key={PATH.TAG_LIST}>
            <Link to={PATH.TAG_LIST}>{PAGE_TITLE[PATH.TAG_LIST]}</Link>
          </Menu.Item>
          <Menu.Item key={PATH.REPORT_LIST_ARTICLE}>
            <Link to={PATH.REPORT_LIST_ARTICLE}>
              {PAGE_TITLE[PATH.REPORT_LIST_ARTICLE]}
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu mode="inline" key="comment" title={<strong>評論</strong>}>
          {/* <Menu.Item key={PATH.COMMENT_LIST}>
              <Link to={PATH.COMMENT_LIST}>評論清單</Link>
            </Menu.Item> */}
          <Menu.Item key={PATH.REPORT_LIST_COMMENT}>
            <Link to={PATH.REPORT_LIST_COMMENT}>
              {PAGE_TITLE[PATH.REPORT_LIST_COMMENT]}
            </Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item key={PATH.FEEDBACK}>
          <Link to={PATH.FEEDBACK}>{PAGE_TITLE[PATH.FEEDBACK]}</Link>
        </Menu.Item>
      </Menu>
    </AntLayout.Sider>
  )
}

export default withRouter(Sider)
