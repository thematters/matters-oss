import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection
} from '../../../definitions'

export type NewestResponse = {
  viewer: {
    recommendation: {
      newest: Connection<ArticleDigest>
    }
  }
}
export type NewestInputProps = RouteComponentProps
export type NewestVariables = {
  input: GQLConnectionArgs
}
export type NewestChildProps = ChildDataProps<
  NewestInputProps,
  NewestResponse,
  NewestVariables
>

export type SearchArticlesResponse = {
  search: Connection<ArticleDigest>
}
export type SearchArticlesInputProps = RouteComponentProps
export type SearchArticlesVariables = {
  input: GQLConnectionArgs & {
    key: string
    type: 'Article'
  }
}
export type SearchArticlesChildProps = ChildDataProps<
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables
>
