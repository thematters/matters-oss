import { graphql, compose, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey } from '../../utils'
import {
  GQL_FRAGMENT_TAG_DIGEST,
  GQL_FRAGMENT_CONNECTION_INFO
} from '../../gql'
import { PAGE_SIZE } from '../../constants'
import { TagDigest, GQLConnectionArgs, Connection } from '../../definitions'
import searchTags, { SearchTagsChildProps } from '../../hocs/withSearchTags'

type AllTagsResponse = {
  oss: {
    tags: Connection<TagDigest>
  }
}
type AllTagsInputProps = RouteComponentProps
type AllTagsVariables = {
  input: GQLConnectionArgs
}
type AllTagsChildProps = ChildDataProps<
  AllTagsInputProps,
  AllTagsResponse,
  AllTagsVariables
>
export type TagListChildProps = AllTagsChildProps & SearchTagsChildProps

const GET_ALL_TAGS = gql`
  query AllTags($input: ConnectionArgs!) {
    oss {
      tags(input: $input) {
        ...ConnectionInfo
        edges {
          node {
            ...TagDigest
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_TAG_DIGEST}
`

const allTags = graphql<
  AllTagsInputProps,
  AllTagsResponse,
  AllTagsVariables,
  AllTagsChildProps
>(GET_ALL_TAGS, {
  // name: 'allTags',
  options: props => ({
    variables: {
      input: {
        first: PAGE_SIZE
      }
    }
  }),
  skip: () => !!getSearchKey()
})

export default compose(
  allTags,
  searchTags
)
