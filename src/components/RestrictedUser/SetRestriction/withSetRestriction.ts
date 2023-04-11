import { graphql, ChildMutateProps } from 'react-apollo'
import { GQLUserRestrictionType, UserDigest } from '../../../definitions'
import SET_RESTRICTION from '../../../gql/mutations/setRestriction.gql'

type Response = {
  putRestrictedUsers: UserDigest[]
}

type InputProps = {
  userId: string
  restrictions: GQLUserRestrictionType[]
}

type Variables = {
  input: { ids: string[]; restrictions: GQLUserRestrictionType[] }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetRestriction = graphql<InputProps, Response, Variables, ChildProps>(
  SET_RESTRICTION
)

export default withSetRestriction
