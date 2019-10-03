import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import {
  OAuthClientDigest,
  GQLConnectionArgs,
  Connection
} from '../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../utils'
import QueryOAuthClientList from '../../gql/queries/oauthClientList.gql'

type AllOAuthClientsResponse = {
  oss: {
    oauthClients: Connection<OAuthClientDigest>
  }
}
type AllOAuthClientsInputProps = RouteComponentProps
type AllOAuthClientsVariables = {
  input: GQLConnectionArgs
}
type AllOAuthClientsChildProps = ChildDataProps<
  AllOAuthClientsInputProps,
  AllOAuthClientsResponse,
  AllOAuthClientsVariables
>

export type OAuthClientListChildProps = AllOAuthClientsChildProps

const allOAuthClients = graphql<
  AllOAuthClientsInputProps,
  AllOAuthClientsResponse,
  AllOAuthClientsVariables,
  AllOAuthClientsChildProps
>(QueryOAuthClientList, {
  // name: 'allOAuthClients',
  options: props => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after
        }
      }
    }
  },
  skip: () => !!getSearchKey()
})

export default compose(allOAuthClients)
