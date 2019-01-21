import { graphql, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import { GQL_FRAGMENT_TAG_DIGEST, GQL_FRAGMENT_CONNECTION_INFO } from '../gql'
import { PAGE_SIZE } from '../constants'
import { TagDetail, GQLConnectionArgs, Connection } from '../definitions'
import { getSearchKey } from '../utils'

type SearchTagsResponse = {
  search: Connection<TagDetail>
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

const SEARCH_TAGS = gql`
  query SearchTags($input: SearchInput!) {
    search(input: $input) {
      ...ConnectionInfo
      edges {
        node {
          ... on Tag {
            ...TagDetail
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_TAG_DIGEST}
`

export default graphql<
  SearchTagsInputProps,
  SearchTagsResponse,
  SearchTagsVariables,
  SearchTagsChildProps
>(SEARCH_TAGS, {
  // name: 'searchTags',
  options: props => ({
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
