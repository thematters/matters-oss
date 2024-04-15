import { graphql, ChildMutateProps } from 'react-apollo'
import { GQLIcymiTopic } from '../../../definitions'
import PUT_ICYMITOPIC from '../../../gql/mutations/putIcymiTopic.gql'

type Response = {
  putIcymiTopic: GQLIcymiTopic
}

type InputProps = {
  id: string
  title: string
}

type Variables = {
  input: {
    id: string
    title: string
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetTitle = graphql<InputProps, Response, Variables, ChildProps>(
  PUT_ICYMITOPIC
)

export default withSetTitle
