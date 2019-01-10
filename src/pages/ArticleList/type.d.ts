import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { ArticleDigest, ConnectionArgs, Connection } from '../../definitions'

export type AllArticlesResponse = {
  articles: Connection<ArticleDigest>
}
export type AllArticlesInputProps = RouteComponentProps
export type AllArticlesVariables = {
  input: ConnectionArgs
}
export type AllArticlesChildProps = ChildDataProps<
  AllArticlesInputProps,
  AllArticlesResponse,
  AllArticlesVariables
>

export type SearchArticlesResult = {
  node: ArticleDigest
  match: string
}
export type SearchArticlesResponse = {
  search: Connection<SearchArticlesResult>
}
export type SearchArticlesInputProps = RouteComponentProps
export type SearchArticlesVariables = {
  input: ConnectionArgs & {
    key: string
    type: 'Article'
  }
}
export type SearchArticlesChildProps = ChildDataProps<
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables
>
