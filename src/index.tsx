import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import Layout from './components/Layout'

import routes from './routes'
import { API_ENDPOINT } from './constants'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  uri: API_ENDPOINT
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
