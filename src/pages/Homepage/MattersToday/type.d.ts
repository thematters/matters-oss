import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection
} from '../../../definitions'

export type MattersTodayResponse = {
  oss: {
    today: Connection<ArticleDigest>
  }
}
export type MattersTodayInputProps = RouteComponentProps
export type MattersTodayVariables = {
  input: GQLConnectionArgs
}
export type MattersTodayChildProps = ChildDataProps<
  MattersTodayInputProps,
  MattersTodayResponse,
  MattersTodayVariables
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
