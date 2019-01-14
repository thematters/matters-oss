import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { ArticleDigest, GQLConnectionArgs, Connection } from '../../definitions'

export type AllArticlesResponse = {
  oss: {
    articles: Connection<ArticleDigest>
  }
}
export type AllArticlesInputProps = RouteComponentProps
export type AllArticlesVariables = {
  input: GQLConnectionArgs
}
export type AllArticlesChildProps = ChildDataProps<
  AllArticlesInputProps,
  AllArticlesResponse,
  AllArticlesVariables
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
