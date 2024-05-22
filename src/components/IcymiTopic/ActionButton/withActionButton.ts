import { graphql, ChildMutateProps } from 'react-apollo'
import { GQLIcymiTopic } from '../../../definitions'
import PUT_ICYMITOPIC from '../../../gql/mutations/putIcymiTopic.gql'

type Response = {
  putIcymiTopic: GQLIcymiTopic
}

type TopicState = 'editing' | 'published' | 'archived'

type InputProps = {
  id: string
  currentState: TopicState
  newState: TopicState
  disabled?: boolean
}

type Variables = {
  input: {
    id: string
    state: TopicState
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withButton = graphql<InputProps, Response, Variables, ChildProps>(
  PUT_ICYMITOPIC
)

export default withButton
