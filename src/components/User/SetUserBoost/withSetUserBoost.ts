import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_USER_BOOST = gql`
  mutation setUserBoost($input: SetUserBoostInput!) {
    setUserBoost(input: $input) {
      id # for update cache
      oss {
        boost
        score
      }
    }
  }
`

type Response = {
  setUserBoost: {
    oss: {
      boost: number
      score: number
    }
  }
}

type InputProps = {
  boost: number
  userId: string
}

type Variables = {
  input: {
    id: string
    boost: number
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetUserBoost = graphql<InputProps, Response, Variables, ChildProps>(
  SET_USER_BOOST
)

export default withSetUserBoost
