import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../../utils'
import {
  TagsInputProps,
  TagsResponse,
  TagsVariables,
  TagsChildProps,
  SearchTagsInputProps,
  SearchTagsResponse,
  SearchTagsVariables,
  SearchTagsChildProps
} from './type'
import { GQL_FRAGMENT_TAG_DIGEST } from '../../../gql'

const GET_TAGS = gql`
  query Tags($input: ConnectionArgs!) {
    viewer {
      recommendation {
        tags(input: $input) {
          edges {
            node {
              ...TagDigest
            }
          }
        }
      }
    }
  }
  ${GQL_FRAGMENT_TAG_DIGEST}
`
const SEARCH_TAGS = gql`
  query SearchTags($input: SearchInput!) {
    search(input: $input) {
      edges {
        node {
          ... on Tag {
            ...TagDigest
          }
        }
      }
    }
  }
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
        first: 10
      }
    }
  }),
  skip: () => !!getSearchKey()
})

const searchTags = graphql<
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
        first: 10
      }
    }
  }),
  skip: () => !getSearchKey()
})

export default compose(
  tags,
  searchTags
)
