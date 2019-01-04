import * as React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Divider } from 'antd'

import logo from 'src/assets/logo.svg'

import { PATH } from 'src/constants'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

class Page extends React.Component {
  public render() {
    return (
      <Layout>
        <Sider theme="light" breakpoint="lg" collapsedWidth="0">
          <div className="logo" style={{ padding: '24px 24px 0' }}>
            <img src={logo} />
            <strong>&nbsp; Matters OSS</strong>
          </div>

          <Divider />

          <Menu
            mode="inline"
            inlineCollapsed={false}
            defaultOpenKeys={['homepage', 'report']}
          >
            <SubMenu mode="inline" key="homepage" title={<span>首頁</span>}>
              <Menu.Item key="homepage-matters-today">
                <Link to={PATH.HOMEPAGE_MATTERS_TODAY}>
                  <span className="nav-text">Matters Today</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="homepage-hot">
                <Link to={PATH.HOMEPAGE_HOT}>
                  <span className="nav-text">熱門</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="homepage-newest">
                <Link to={PATH.HOMEPAGE_NEWEST}>
                  <span className="nav-text">最新</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="homepage-hot-discussions">
                <Link to={PATH.HOMEPAGE_HOT_DISCUSSIONS}>
                  <span className="nav-text">熱議</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="homepage-matters-choice">
                <Link to={PATH.HOMEPAGE_MATTERS_CHOICE}>
                  <span className="nav-text">Matters Choice</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="homepage-authors">
                <Link to={PATH.AUTHORS}>
                  <span className="nav-text">作者</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="homepage-tags">
                <Link to={PATH.TAGS}>
                  <span className="nav-text">標籤</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="users">
              <Link to={PATH.USERS}>
                <span className="nav-text">用戶</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="articles">
              <Link to={PATH.ARTICLES}>
                <span className="nav-text">文章</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="comments">
              <Link to={PATH.COMMENTS}>
                <span className="nav-text">評論</span>
              </Link>
            </Menu.Item>

            <SubMenu mode="inline" key="report" title={<span>舉報</span>}>
              <Menu.Item key="report-articles">
                <Link to={PATH.REPORT_ARTICLES}>
                  <span className="nav-text">文章</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="report-comments">
                <Link to={PATH.REPORT_COMMENTS}>
                  <span className="nav-text">評論</span>
                </Link>
              </Menu.Item>
            </SubMenu>

            <Menu.Item key="feedback">
              <Link to={PATH.FEEDBACK}>
                <span className="nav-text">反饋</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ minHeight: '100vh' }}>
          <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, background: '#fff' }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>© The Matters</Footer>
        </Layout>
      </Layout>
    )
  }
}

export default Page
