import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey } from '../../utils'
import { PAGE_SIZE } from '../../constants'
import { TagDigest, GQLConnectionArgs, Connection } from '../../definitions'
import searchTags, { SearchTagsChildProps } from '../../hocs/withSearchTags'
import QueryTagList from '../../gql/queries/tagList.gql'

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

const allTags = graphql<
  AllTagsInputProps,
  AllTagsResponse,
  AllTagsVariables,
  AllTagsChildProps
>(QueryTagList, {
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
