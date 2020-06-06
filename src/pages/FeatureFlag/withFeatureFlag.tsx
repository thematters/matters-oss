import { graphql, ChildDataProps, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router-dom'

import { PAGE_SIZE } from '../../constants'
import {
  BlockListItemDigest,
  GQLConnectionArgs,
  Connection
} from '../../definitions'
import { getCurrentPaginationFromUrl } from '../../utils'
import QueryFeatureFlag from '../../gql/queries/featureFlag.gql'

type FeatureFlagResponse = {
  official: {
    features: Array<{
      name: string
      enabled: boolean
    }>
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
  undefined,
  FeatureFlagChildProps
>(QueryFeatureFlag)

export default withFeatureFlag
