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
import cloneDeepWith from 'lodash/cloneDeepWith'

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

const omitTypenameDeep = (
  variables: Record<string, unknown>
): Record<string, unknown> =>
  cloneDeepWith(variables, (value) => {
    if (value?.__typename) {
      const { __typename, ...valWithoutTypename } = value
      return omitTypenameDeep(valWithoutTypename)
    }
    return undefined
  })

const removeTypename = new ApolloLink((operation, forward) => {
  const newOperation = operation
  newOperation.variables = omitTypenameDeep(newOperation.variables)
  return forward(newOperation)
})

const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key: any, value: any) =>
      key === '__typename' ? undefined : value
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    )
  }
  return forward(operation).map((data) => {
    return data
  })
})

const client = new ApolloClient({
  link: ApolloLink.from([
    removeTypename,
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
      headers: {
        'Apollo-Require-Preflight': 'true',
      },
    }),
  ]),
  cache: new InMemoryCache({ fragmentMatcher }),
})

export default client
