import { graphql, compose, ChildMutateProps } from 'react-apollo'

import { TagDigest } from '../definitions'
import MutationDeleteTags from '../gql/mutations/deleteTags.gql'
import MutationRenameTag from '../gql/mutations/renameTag.gql'
import MutationMergeTags from '../gql/mutations/mergeTags.gql'

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

const deleteTags = graphql<
  DeleteTagsInputProps,
  DeleteTagsResponse,
  DeleteTagsVariables,
  DeleteTagsChildProps
>(MutationDeleteTags, {
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

const renameTag = graphql<
  RenameTagInputProps,
  RenameTagResponse,
  RenameTagVariables,
  RenameTagChildProps
>(MutationRenameTag, {
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

const mergeTags = graphql<
  MergeTagsInputProps,
  MergeTagsResponse,
  MergeTagsVariables,
  MergeTagsChildProps
>(MutationMergeTags, {
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
