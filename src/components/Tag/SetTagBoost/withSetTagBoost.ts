import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'

const SET_TAG_BOOST = gql`
  mutation setTagBoost($input: SetTagBoostInput!) {
    setTagBoost(input: $input) {
      id # for update cache
      oss {
        boost
        score
      }
    }
  }
`

type Response = {
  setTagBoost: {
    oss: {
      boost: number
      score: number
    }
  }
}

type InputProps = {
  boost: number
  tagId: string
}

type Variables = {
  input: {
    id: string
    boost: number
  }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetTagBoost = graphql<InputProps, Response, Variables, ChildProps>(
  SET_TAG_BOOST
)

export default withSetTagBoost
