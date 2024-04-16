import { graphql, ChildMutateProps } from 'react-apollo'
import { GQLIcymiTopic } from '../../../definitions'
import PUT_ICYMITOPIC from '../../../gql/mutations/putIcymiTopic.gql'

type Response = {
  putIcymiTopic: GQLIcymiTopic
}

type InputProps = {
  id: string
  note: string
  disabled: boolean
}

type Variables = {
  input: {
    id: string
    note: string
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetNote = graphql<InputProps, Response, Variables, ChildProps>(
  PUT_ICYMITOPIC
)

export default withSetNote
