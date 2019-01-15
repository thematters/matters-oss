import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { TagDigest, GQLConnectionArgs, Connection } from '../../definitions'

export type AllTagsResponse = {
  oss: {
    tags: Connection<TagDigest>
  }
}
export type AllTagsInputProps = RouteComponentProps
export type AllTagsVariables = {
  input: GQLConnectionArgs
}
export type AllTagsChildProps = ChildDataProps<
  AllTagsInputProps,
  AllTagsResponse,
  AllTagsVariables
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
