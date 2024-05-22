import { graphql, ChildMutateProps } from 'react-apollo'
import { GQLIcymiTopic } from '../../../definitions'
import PUT_ICYMITOPIC from '../../../gql/mutations/putIcymiTopic.gql'

type Response = {
  putIcymiTopic: GQLIcymiTopic
}

type InputProps = {
  id: string
  pinAmount: number
  disabled: boolean
}

type Variables = {
  input: {
    id: string
    pinAmount: number
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetPinAmount = graphql<InputProps, Response, Variables, ChildProps>(
  PUT_ICYMITOPIC
)

export default withSetPinAmount
