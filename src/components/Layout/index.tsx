import * as React from 'react'
import { Layout as AntLayout } from 'antd'

import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import Sider from './Sider'

import './style.less'

const Layout: React.FunctionComponent & {
  Header: typeof Header
  Content: typeof Content
} = ({ children }) => (
  <AntLayout className="l-layout">
    <Sider />
    <AntLayout style={{ minHeight: '100vh' }}>
      {children}
      <Footer />
    </AntLayout>
  </AntLayout>
)

Layout.Header = Header
Layout.Content = Content

export default Layout
