import { graphql, compose, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

import { TagDigest } from '../definitions'
import { GQL_FRAGMENT_TAG_DIGEST } from '../gql'

/**
 * Delete Tags
 */
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
const DELETE_TAGS = gql`
  mutation deleteTags($input: DeleteTagsInput!) {
    deleteTags(input: $input)
  }
`
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
const RENAME_TAG = gql`
  mutation renameTag($input: RenameTagInput!) {
    renameTag(input: $input) {
      ...TagDigest
    }
  }
  ${GQL_FRAGMENT_TAG_DIGEST}
`
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
const MERGE_TAGS = gql`
  mutation mergeTags($input: MergeTagsInput!) {
    mergeTags(input: $input) {
      ...TagDigest
    }
  }
  ${GQL_FRAGMENT_TAG_DIGEST}
`
const mergeTags = graphql<
  MergeTagsInputProps,
  MergeTagsResponse,
  MergeTagsVariables,
  MergeTagsChildProps
>(MERGE_TAGS, {
  name: 'mergeTags'
})

// exports
export default compose(
  deleteTags,
  renameTag,
  mergeTags
)

export type TagMutationsChildProps = DeleteTagsChildProps &
  RenameTagChildProps &
  MergeTagsChildProps
