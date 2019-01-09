import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import Layout from './components/Layout'

import routes from './routes'
import { API_ENDPOINT, STORE_JWT_TOKEN } from './constants'
import registerServiceWorker from './registerServiceWorker'
import './index.less'

const client = new ApolloClient({
  uri: API_ENDPOINT,
  headers: {
    'x-access-token': localStorage.getItem(STORE_JWT_TOKEN)
  }
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
registerServiceWorker()
