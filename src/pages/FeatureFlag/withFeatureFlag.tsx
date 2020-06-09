import { graphql, ChildDataProps } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import QueryFeatureFlag from '../../gql/queries/featureFlag.gql'
import { FeatureFlagItem } from '../../definitions'

type FeatureFlagResponse = {
  official: {
    features: FeatureFlagItem[]
  }
}

export type FeatureFlagChildProps = ChildDataProps<
  RouteComponentProps,
  FeatureFlagResponse,
  undefined
>

const withFeatureFlag = graphql<
  RouteComponentProps,
  FeatureFlagResponse,
  {},
  FeatureFlagChildProps
>(QueryFeatureFlag)

export default withFeatureFlag
