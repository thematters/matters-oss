import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { ArticleDigest } from '../../definitions'

export type AllArticlesResponse = {
  articles: ArticleDigest[]
}
export type AllArticlesInputProps = RouteComponentProps
export type AllArticlesVariables = {
  input: {
    offset: number
    limit: number
  }
}
export type AllArticlesChildProps = ChildDataProps<
  AllArticlesInputProps,
  AllArticlesResponse,
  AllArticlesVariables
>

export type SearchArticlesResult = {
  node: ArticleDigest
  match: String
}
export type SearchArticlesResponse = {
  search: SearchArticlesResult[]
}
export type SearchArticlesInputProps = RouteComponentProps
export type SearchArticlesVariables = {
  input: {
    key: string
    type: 'Article'
    offset: number
    limit: number
  }
}
export type SearchArticlesChildProps = ChildDataProps<
  SearchArticlesInputProps,
  SearchArticlesResponse,
  SearchArticlesVariables
>
