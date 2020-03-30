import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import { BlockListItemDigest, GQLConnectionArgs, Connection } from '../../definitions'
import { getCurrentPaginationFromUrl } from '../../utils'
import QueryBlockList from '../../gql/queries/blockList.gql'

type AllBlockListItemsResponse = {
  oss: {
    agentHashes: Connection<BlockListItemDigest>
  }
}

type AllBlockListItemsInputProps = RouteComponentProps

type AllBlockListItemsVariables = {
  input: GQLConnectionArgs
}

export type AllBlockListItemsChildProps = ChildDataProps<
  AllBlockListItemsInputProps,
  AllBlockListItemsResponse,
  AllBlockListItemsVariables
>

const allBlockListItems = graphql<
  AllBlockListItemsInputProps,
  AllBlockListItemsResponse,
  AllBlockListItemsVariables,
  AllBlockListItemsChildProps
>(QueryBlockList, {
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
  }
})

export default allBlockListItems
