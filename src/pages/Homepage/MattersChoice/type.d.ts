import { ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import {
  ArticleDigest,
  GQLConnectionArgs,
  Connection
} from '../../../definitions'

export type MattersChoiceResponse = {
  viewer: {
    recommendation: {
      icymi: Connection<ArticleDigest>
    }
  }
}
export type MattersChoiceInputProps = RouteComponentProps
export type MattersChoiceVariables = {
  input: GQLConnectionArgs
}
export type MattersChoiceChildProps = ChildDataProps<
  MattersChoiceInputProps,
  MattersChoiceResponse,
  MattersChoiceVariables
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
