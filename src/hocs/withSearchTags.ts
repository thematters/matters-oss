import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../constants'
import { TagDigest, GQLConnectionArgs, Connection } from '../definitions'
import { getSearchKey } from '../utils'
import QuerySearchTags from '../gql/queries/searchTags.gql'

type SearchTagsResponse = {
  search: Connection<TagDigest>
}
type SearchTagsInputProps = RouteComponentProps
type SearchTagsVariables = {
  input: GQLConnectionArgs & {
    key: string
    type: 'Tag'
  }
}
export type SearchTagsChildProps = ChildDataProps<
  SearchTagsInputProps,
  SearchTagsResponse,
  SearchTagsVariables
>

export default graphql<
  SearchTagsInputProps,
  SearchTagsResponse,
  SearchTagsVariables,
  SearchTagsChildProps
>(QuerySearchTags, {
  // name: 'searchTags',
  options: props => ({
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        key: getSearchKey(),
        type: 'Tag',
        first: PAGE_SIZE
      }
    }
  }),
  skip: () => !getSearchKey()
})
