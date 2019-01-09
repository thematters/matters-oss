import * as React from 'react'
import {
  Link,
  NavLink,
  withRouter,
  RouteComponentProps
} from 'react-router-dom'
import { Layout as AntLayout, Menu } from 'antd'

import Divider from '../../components/Divider'

import { PATH, STORE_JWT_TOKEN } from '../../constants'
import LOGO_URL from '../../assets/logo.svg'
import './style.less'

const { Content, Footer, Sider } = AntLayout
const { SubMenu } = Menu

class Layout extends React.Component<RouteComponentProps> {
  isAuthenticated = window.localStorage.getItem(STORE_JWT_TOKEN)

  private _renderSider() {
    const { location } = this.props

    if (!this.isAuthenticated) {
      return
    }

    return (
      <Sider theme="light" width="250" breakpoint="lg" collapsedWidth="0">
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
          defaultOpenKeys={['homepage', 'user', 'article', 'report']}
        >
          <SubMenu mode="inline" key="homepage" title={<span>首頁</span>}>
            <Menu.Item key={PATH.HOMEPAGE_MATTERS_TODAY}>
              <NavLink to={PATH.HOMEPAGE_MATTERS_TODAY}>Matters Today</NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.HOMEPAGE_HOT}>
              <NavLink to={PATH.HOMEPAGE_HOT}>熱門文章</NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.HOMEPAGE_NEWEST}>
              <NavLink to={PATH.HOMEPAGE_NEWEST}>最新發布</NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.HOMEPAGE_HOT_DISCUSSIONS}>
              <NavLink to={PATH.HOMEPAGE_HOT_DISCUSSIONS}>熱議話題</NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.HOMEPAGE_MATTERS_CHOICE}>
              <NavLink to={PATH.HOMEPAGE_MATTERS_CHOICE}>
                不要錯過 (Matters Choice)
              </NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.HOMEPAGE_AUTHORS}>
              <NavLink to={PATH.HOMEPAGE_AUTHORS}>活躍作者</NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.HOMEPAGE_TAGS}>
              <NavLink to={PATH.HOMEPAGE_TAGS}>標籤</NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu mode="inline" key="user" title={<span>用戶</span>}>
            <Menu.Item key={PATH.USER_LIST}>
              <NavLink to={PATH.USER_LIST}>用戶清單</NavLink>
            </Menu.Item>
          </SubMenu>

          <SubMenu mode="inline" key="article" title={<span>文章</span>}>
            <Menu.Item key={PATH.ARTICLE_LIST}>
              <NavLink to={PATH.ARTICLE_LIST}>文章清單</NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.TAG_LIST}>
              <NavLink to={PATH.TAG_LIST}>標籤清單</NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key={PATH.COMMENT_LIST}>
            <NavLink to={PATH.COMMENT_LIST}>評論</NavLink>
          </Menu.Item>

          <SubMenu mode="inline" key="report" title={<span>舉報</span>}>
            <Menu.Item key={PATH.REPORT_ARTICLES}>
              <NavLink to={PATH.REPORT_ARTICLES}>文章</NavLink>
            </Menu.Item>
            <Menu.Item key={PATH.REPORT_COMMENTS}>
              <NavLink to={PATH.REPORT_COMMENTS}>評論</NavLink>
            </Menu.Item>
          </SubMenu>

          <Menu.Item key={PATH.FEEDBACK}>
            <NavLink to={PATH.FEEDBACK}>反饋</NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    )
  }

  private _renderLogoutButton() {
    if (!this.isAuthenticated) {
      return
    }

    return (
      <span style={{ float: 'right' }}>
        <button
          style={{ fontSize: 12 }}
          type="button"
          onClick={() => {
            window.localStorage.removeItem(STORE_JWT_TOKEN)
            window.location.reload()
          }}
        >
          登出
        </button>
      </span>
    )
  }

  private _renderContent() {
    const { children } = this.props

    return (
      <AntLayout style={{ minHeight: '100vh' }}>
        <Content style={{ padding: 24, margin: 24, background: '#fff' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          © The Matters
          {this._renderLogoutButton()}
        </Footer>
      </AntLayout>
    )
  }

  public render() {
    return (
      <AntLayout className="l-layout">
        {this._renderSider()}
        {this._renderContent()}
      </AntLayout>
    )
  }
}

export default withRouter(Layout)
