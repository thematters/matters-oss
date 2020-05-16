import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../../constants'
import { TagDigest, GQLConnectionArgs, Connection } from '../../../definitions'
import { getSearchKey, getCurrentPaginationFromUrl } from '../../../utils'
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
  options: (props) => {
    const currentPagination = getCurrentPaginationFromUrl()
    return {
      notifyOnNetworkStatusChange: true,
      variables: {
        input: {
          first: PAGE_SIZE,
          after: currentPagination && currentPagination.after,
          oss: true,
        },
      },
    }
  },
  skip: () => !!getSearchKey(),
})

export default compose(tags, searchTags)
