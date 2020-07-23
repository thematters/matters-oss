import * as Sentry from '@sentry/browser'
import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import _get from 'lodash/get'

import { API_ENDPOINT } from './constants'
import introspectionQueryResultData from './gql/fragmentTypes.json'
import { genSentryActionId } from './utils'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
})

// Inject action id for Sentry
const sentryLink = setContext((_, { headers }) => {
  const actionId = genSentryActionId()
  Sentry.configureScope((scope: any) => {
    scope.setTag('action-id', actionId)
  })

  return {
    headers: {
      ...headers,
      'x-sentry-action-id': actionId,
    },
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        })
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    sentryLink,
    createUploadLink({
      uri: API_ENDPOINT,
      credentials: 'include',
    }),
  ]),
  cache: new InMemoryCache({ fragmentMatcher }),
})

export default client
