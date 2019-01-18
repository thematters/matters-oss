import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_BOOST = gql`
  mutation setBoost($input: SetBoostInput!) {
    setBoost(input: $input) {
      id # for update cache
      ... on Article {
        oss {
          boost
          score
        }
      }
      ... on User {
        oss {
          boost
          score
        }
      }
      ... on Tag {
        oss {
          boost
          score
        }
      }
    }
  }
`

type Response = {
  setBoost: {
    oss: {
      boost: number
      score: number
    }
  }
}

type InputProps = {
  boost: number
  id: string
  type: 'Article' | 'Tag' | 'User'
}

type Variables = {
  input: {
    id: string
    boost: number
    type: 'Article' | 'Tag' | 'User'
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetBoost = graphql<InputProps, Response, Variables, ChildProps>(
  SET_BOOST
)

export default withSetBoost
