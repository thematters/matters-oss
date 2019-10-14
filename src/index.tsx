import * as Sentry from '@sentry/browser'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import Layout from './components/Layout'
import { SENTRY_DSN } from './constants'

import routes from './routes'
import client from './client'
import './index.less'

import { unregister } from './registerServiceWorker'
unregister()

// start and configure Sentry
Sentry.init({ dsn: SENTRY_DSN || '' })
Sentry.configureScope((scope: any) => {
  scope.setTag('source', 'oss')
})

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Layout>
            <Switch>{renderRoutes(routes)}</Switch>
          </Layout>
        </Router>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
