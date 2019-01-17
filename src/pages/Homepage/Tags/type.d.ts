import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { TagDigest, GQLConnectionArgs, Connection } from '../../../definitions'

export type TagsResponse = {
  viewer: {
    recommendation: {
      tags: Connection<TagDigest>
    }
  }
}
export type TagsInputProps = RouteComponentProps
export type TagsVariables = {
  input: GQLConnectionArgs
}
export type TagsChildProps = ChildDataProps<
  TagsInputProps,
  TagsResponse,
  TagsVariables
>

export type SearchTagsResponse = {
  search: Connection<TagDigest>
}
export type SearchTagsInputProps = RouteComponentProps
export type SearchTagsVariables = {
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
