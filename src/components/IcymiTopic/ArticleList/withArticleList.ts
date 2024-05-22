import { graphql, ChildMutateProps } from 'react-apollo'
import { GQLIcymiTopic } from '../../../definitions'
import PUT_ICYMITOPIC from '../../../gql/mutations/putIcymiTopic.gql'

type Response = {
  putIcymiTopic: GQLIcymiTopic
}

type Article = {
  id: string
  title: string
}

export type InputProps = {
  id: string
  articles: Article[]
  disabled: boolean
}

type Variables = {
  input: {
    id: string
    articles: string[]
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withArticleList = graphql<InputProps, Response, Variables, ChildProps>(
  PUT_ICYMITOPIC
)

export default withArticleList
