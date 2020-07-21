import * as React from 'react'
import { Layout as AntLayout } from 'antd'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Header from './Header'
import Footer from './Footer'
import Content from './Content'
import Sider from './Sider'
import { ViewerProvider } from './ViewerProvider'

import './style.less'

const ROOT_QUERY = gql`
  query RootQuery {
    viewer {
      id
      ...ViewerUser
    }
  }
  ${ViewerProvider.fragments.user}
`

const Layout: React.FunctionComponent & {
  Header: typeof Header
  Content: typeof Content
} = ({ children }) => {
  return (
    <Query query={ROOT_QUERY}>
      {({ data, loading }: any) => {
        const viewer = data?.viewer

        if (loading || !viewer) {
          return null
        }

        return (
          <ViewerProvider viewer={viewer}>
            <AntLayout className="l-layout">
              <Sider />
              <AntLayout style={{ minHeight: '100vh' }}>
                {children}
                <Footer />
              </AntLayout>
            </AntLayout>
          </ViewerProvider>
        )
      }}
    </Query>
  )
}

Layout.Header = Header
Layout.Content = Content

export default Layout
