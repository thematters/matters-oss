import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

import Page from '../src/components/Page'

import routes from '../src/routes'
import './index.css'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  uri: process.env.API_ENDPOINT
})

class App extends React.Component {
  public render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Page>
            <Switch>{renderRoutes(routes)}</Switch>
          </Page>
        </Router>
      </ApolloProvider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root') as HTMLElement)
registerServiceWorker()
