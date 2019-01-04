import * as React from 'react'
import { NavLink, withRouter, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Divider } from 'antd'

import { PATH } from '../../../src/constants'

import LOGO_URL from '../../../src/assets/logo.svg'
import './page.css'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

class Page extends React.Component<RouteComponentProps> {
  public render() {
    const { children, location } = this.props
    return (
      <Layout>
        <Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <div className="logo" style={{ padding: '24px 24px 0' }}>
            <img src={LOGO_URL} />
            <strong>&nbsp; Matters OSS</strong>
          </div>

          <Divider />

          <Menu
            className="c-menu"
            selectable={false}
            mode="inline"
            inlineCollapsed={false}
            selectedKeys={[location.pathname]}
            defaultOpenKeys={['homepage', 'report']}
          >
            <SubMenu mode="inline" key="homepage" title={<span>首頁</span>}>
              <Menu.Item key={PATH.HOMEPAGE_MATTERS_TODAY}>
                <NavLink to={PATH.HOMEPAGE_MATTERS_TODAY}>
                  Matters Today
                </NavLink>
              </Menu.Item>
              <Menu.Item key={PATH.HOMEPAGE_HOT}>
                <NavLink to={PATH.HOMEPAGE_HOT}>熱門</NavLink>
              </Menu.Item>
              <Menu.Item key={PATH.HOMEPAGE_NEWEST}>
                <NavLink to={PATH.HOMEPAGE_NEWEST}>最新</NavLink>
              </Menu.Item>
              <Menu.Item key={PATH.HOMEPAGE_HOT_DISCUSSIONS}>
                <NavLink to={PATH.HOMEPAGE_HOT_DISCUSSIONS}>熱議</NavLink>
              </Menu.Item>
              <Menu.Item key={PATH.HOMEPAGE_MATTERS_CHOICE}>
                <NavLink to={PATH.HOMEPAGE_MATTERS_CHOICE}>
                  Matters Choice
                </NavLink>
              </Menu.Item>
              <Menu.Item key={PATH.HOMEPAGE_AUTHORS}>
                <NavLink to={PATH.HOMEPAGE_AUTHORS}>作者</NavLink>
              </Menu.Item>
              <Menu.Item key={PATH.TAG_LIST}>
                <NavLink to={PATH.TAG_LIST}>標籤</NavLink>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key={PATH.USER_LIST}>
              <NavLink to={PATH.USER_LIST}>用戶</NavLink>
            </Menu.Item>

            <Menu.Item key={PATH.ARTICLE_LIST}>
              <NavLink to={PATH.ARTICLE_LIST}>文章</NavLink>
            </Menu.Item>

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
        <Layout style={{ minHeight: '100vh' }}>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff' }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>© The Matters</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default withRouter(Page)
