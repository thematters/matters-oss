import { graphql, compose, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../../constants'
import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection
} from '../../../definitions'
import { getSearchKey } from '../../../utils'
import searchArticles, {
  SearchArticlesChildProps
} from '../../../hocs/withSearchArticles'
import QueryRecommendToday from '../../../gql/queries/recommendToday.gql'

type MattersTodayResponse = {
  oss: {
    today: Connection<ArticleDigest>
  }
}
type MattersTodayInputProps = RouteComponentProps
type MattersTodayVariables = {
  input: GQLConnectionArgs
}
type MattersTodayChildProps = ChildDataProps<
  MattersTodayInputProps,
  MattersTodayResponse,
  MattersTodayVariables
>
export type MattersTodayListChildProps = MattersTodayChildProps &
  SearchArticlesChildProps

const mattersToday = graphql<
  MattersTodayInputProps,
  MattersTodayResponse,
  MattersTodayVariables,
  MattersTodayChildProps
>(QueryRecommendToday, {
  // name: 'today',
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
  mattersToday,
  searchArticles
)
