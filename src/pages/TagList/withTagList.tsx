import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { getSearchKey } from '../../utils'
import {
  AllTagsInputProps,
  AllTagsResponse,
  AllTagsVariables,
  AllTagsChildProps,
  SearchTagsInputProps,
  SearchTagsResponse,
  SearchTagsVariables,
  SearchTagsChildProps
} from './type'
import { GQL_FRAGMENT_TAG_DIGEST } from '../../gql'

const GET_ALL_TAGS = gql`
  query AllTags($input: ConnectionArgs!) {
    oss {
      tags(input: $input) {
        edges {
          node {
            ...TagDigest
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
  allTags,
  searchTags
)
