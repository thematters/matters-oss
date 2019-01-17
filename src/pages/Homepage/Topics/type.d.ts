import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection
} from '../../../definitions'

export type TopicsResponse = {
  viewer: {
    recommendation: {
      topics: Connection<ArticleDigest>
    }
  }
}
export type TopicsInputProps = RouteComponentProps
export type TopicsVariables = {
  input: GQLConnectionArgs
}
export type TopicsChildProps = ChildDataProps<
  TopicsInputProps,
  TopicsResponse,
  TopicsVariables
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
