import { graphql, compose, ChildDataProps } from 'react-apollo'
import gql from 'graphql-tag'
import { RouteComponentProps } from 'react-router-dom'

import {
  GQL_FRAGMENT_TAG_DIGEST,
  GQL_FRAGMENT_CONNECTION_INFO
} from '../../../gql'
import { PAGE_SIZE } from '../../../constants'
import { TagDigest, GQLConnectionArgs, Connection } from '../../../definitions'
import { getSearchKey } from '../../../utils'
import searchTags, { SearchTagsChildProps } from '../../../hocs/withSearchTags'

type TagsResponse = {
  viewer: {
    recommendation: {
      tags: Connection<TagDigest>
    }
  }
}
type TagsInputProps = RouteComponentProps
type TagsVariables = {
  input: GQLConnectionArgs
}
type TagsChildProps = ChildDataProps<
  TagsInputProps,
  TagsResponse,
  TagsVariables
>
export type TagListChildProps = TagsChildProps & SearchTagsChildProps

const GET_TAGS = gql`
  query Tags($input: ConnectionArgs!) {
    viewer {
      recommendation {
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
  }
  ${GQL_FRAGMENT_CONNECTION_INFO}
  ${GQL_FRAGMENT_TAG_DIGEST}
`

const tags = graphql<
  TagsInputProps,
  TagsResponse,
  TagsVariables,
  TagsChildProps
>(GET_TAGS, {
  // name: 'Tags',
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
  tags,
  searchTags
)
