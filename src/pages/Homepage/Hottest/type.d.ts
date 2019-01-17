import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection
} from '../../../definitions'

export type HottestResponse = {
  viewer: {
    recommendation: {
      hottest: Connection<ArticleDigest>
    }
  }
}
export type HottestInputProps = RouteComponentProps
export type HottestVariables = {
  input: GQLConnectionArgs
}
export type HottestChildProps = ChildDataProps<
  HottestInputProps,
  HottestResponse,
  HottestVariables
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
