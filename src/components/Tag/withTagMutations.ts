import { graphql, compose, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

import { TagDigest } from '../../definitions'
import { GQL_FRAGMENT_TAG_DIGEST } from '../../gql'

/**
 * Delete Tags
 */
const DELETE_TAGS = gql`
  mutation deleteTags($input: DeleteTagsInput!) {
    deleteTags(input: $input)
  }
`

type DeleteTagsResponse = {
  deleteTags: boolean
}
type DeleteTagsInputProps = {
  ids: string[]
}
type DeleteTagsVariables = {
  input: {
    ids: string[]
  }
}
export type DeleteTagsChildProps = ChildMutateProps<
  DeleteTagsInputProps,
  DeleteTagsResponse,
  DeleteTagsVariables
>
const deleteTags = graphql<
  DeleteTagsInputProps,
  DeleteTagsResponse,
  DeleteTagsVariables,
  DeleteTagsChildProps
>(DELETE_TAGS, {
  name: 'deleteTags'
})

/**
 * Rename Tag
 */
const RENAME_TAG = gql`
  mutation renameTag($input: RenameTagInput!) {
    renameTag(input: $input) {
      ...TagDigest
    }
  }
  ${GQL_FRAGMENT_TAG_DIGEST}
`

type RenameTagResponse = {
  renameTag: TagDigest
}
type RenameTagInputProps = {
  id: string[]
  content: string
}
type RenameTagVariables = {
  input: {
    id: string[]
    content: string
  }
}
export type RenameTagChildProps = ChildMutateProps<
  RenameTagInputProps,
  RenameTagResponse,
  RenameTagVariables
>
const renameTag = graphql<
  RenameTagInputProps,
  RenameTagResponse,
  RenameTagVariables,
  RenameTagChildProps
>(RENAME_TAG, {
  name: 'renameTag'
})

/**
 * Merge Tags
 */
const MERGE_TAGS = gql`
  mutation mergeTags($input: MergeTagsInput!) {
    mergeTags(input: $input) {
      ...TagDigest
    }
  }
  ${GQL_FRAGMENT_TAG_DIGEST}
`

type MergeTagsResponse = {
  mergeTags: TagDigest
}
type MergeTagsInputProps = {
  ids: string[]
  content: string
}
type MergeTagsVariables = {
  input: {
    ids: string[]
    content: string
  }
}
export type MergeTagsChildProps = ChildMutateProps<
  MergeTagsInputProps,
  MergeTagsResponse,
  MergeTagsVariables
>
const mergeTags = graphql<
  MergeTagsInputProps,
  MergeTagsResponse,
  MergeTagsVariables,
  MergeTagsChildProps
>(MERGE_TAGS, {
  name: 'mergeTags'
})

export default compose(
  deleteTags,
  renameTag,
  mergeTags
)
