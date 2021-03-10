import { graphql, ChildMutateProps } from 'react-apollo'
import gql from 'graphql-tag'
import { FeatureName } from '../../definitions'

const SET_FEATURE = gql`
  mutation updateFeatureFlag($input: SetFeatureInput!) {
    setFeature(input: $input) {
      enabled
      name
    }
  }
`

type Response = {
  updateFeatureFlag: {
    enabled: boolean
    name: FeatureName
  }
}

export type FeatureFlag = 'on' | 'off' | 'admin' | 'seeding'

type InputProps = {
  name: FeatureName
  enabled: boolean
}

type Variables = {
  input: { name: FeatureName; flag: FeatureFlag }
}

export type ChildProps = ChildMutateProps<InputProps, Response, Variables>

const withSetFeature = graphql<InputProps, Response, Variables, ChildProps>(
  SET_FEATURE
)

export default withSetFeature
