import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { getSearchKey, getCurrentPaginationFromUrl } from '../../../utils'
import { PAGE_SIZE } from '../../../constants'
import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection,
} from '../../../definitions'
import searchArticles, {
  SearchArticlesChildProps,
} from '../../../hocs/withSearchArticles'
import QueryRecommendIcymi from '../../../gql/queries/recommendIcymi.gql'

type IcymiResponse = {
  viewer: {
    recommendation: {
      icymi: Connection<ArticleDigest>
    }
  }
}
type IcymiInputProps = RouteComponentProps
type IcymiVariables = {
  input: GQLConnectionArgs
}
type IcymiChildProps = ChildDataProps<
  IcymiInputProps,
  IcymiResponse,
  IcymiVariables
>
export type IcymiListChildProps = IcymiChildProps & SearchArticlesChildProps

const icymi = graphql<
  IcymiInputProps,
  IcymiResponse,
  IcymiVariables,
  IcymiChildProps
>(QueryRecommendIcymi, {
  // name: 'MattersChoice',
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

export default compose(icymi, searchArticles)
