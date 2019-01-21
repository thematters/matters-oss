import { graphql } from 'react-apollo'
import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'
import _get from 'lodash/get'

import { ArticleDetail } from '../../definitions'
import QueryArticleDetail from '../../gql/queries/articleDetail.gql'

type ArticleDetailResponse = {
  article: ArticleDetail
}
type ArticleDetailInputProps = RouteComponentProps
type ArticleDetailVariables = {
  input: {
    id: string
  }
}
export type ArticleDetailChildProps = ChildDataProps<
  ArticleDetailInputProps,
  ArticleDetailResponse,
  ArticleDetailVariables
>

const articleDetail = graphql<
  ArticleDetailInputProps,
  ArticleDetailResponse,
  ArticleDetailVariables,
  ArticleDetailChildProps
>(QueryArticleDetail, {
  options: props => {
    const id = _get(props, 'match.params.id')
    return {
      variables: {
        input: {
          id
        }
      }
    }
  }
})

export default articleDetail
