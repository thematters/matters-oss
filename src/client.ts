import { ApolloClient } from 'apollo-client'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher
} from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
import _get from 'lodash/get'

import { API_ENDPOINT, STORE_JWT_TOKEN, ERROR_CODE } from './constants'
import introspectionQueryResultData from './gql/fragmentTypes.json'

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData
})
const token = localStorage.getItem(STORE_JWT_TOKEN)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path, extensions }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
          const code = _get(extensions, 'code')
          if (code === ERROR_CODE.TOKEN_INVALID) {
            localStorage.removeItem(STORE_JWT_TOKEN)
          }
        })
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    createUploadLink({
      uri: API_ENDPOINT,
      credentials: 'same-origin',
      headers: token && {
        'x-access-token': token
      }
    })
  ]),
  cache: new InMemoryCache({ fragmentMatcher })
})

export default client
