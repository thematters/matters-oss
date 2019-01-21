import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../../constants'
import { TagDigest, GQLConnectionArgs, Connection } from '../../../definitions'
import { getSearchKey } from '../../../utils'
import searchTags, { SearchTagsChildProps } from '../../../hocs/withSearchTags'
import QueryRecommendTags from '../../../gql/queries/recommendTags.gql'

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

const tags = graphql<
  TagsInputProps,
  TagsResponse,
  TagsVariables,
  TagsChildProps
>(QueryRecommendTags, {
  // name: 'Tags',
  options: props => ({
    notifyOnNetworkStatusChange: true,
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
