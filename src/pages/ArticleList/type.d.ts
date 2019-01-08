import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

export type ArticleListItem = {
  id: string
  slug: string
  createdAt: Date
  publishState: string
  live: boolean
  public: boolean
  author: {
    id: string
    uuid: string
    info: {
      userName: string
      displayName: string
    }
  }
  title: string
  tags: string[]
}

export type SearchArticlesResult = {
  node: ArticleListItem
  match: String
}

export type AllArticlesResponse = {
  articles: ArticleListItem[]
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
