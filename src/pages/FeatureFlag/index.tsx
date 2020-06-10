import * as React from 'react'

import FeatureList from '../../components/FeatureList'
import withFeatureFlag, { FeatureFlagChildProps } from './withFeatureFlag'
import ErrorMessage from '../../components/ErrorMessage'

class FeatureFlagPage extends React.Component<FeatureFlagChildProps> {
  public render() {
    const {
      data: { official, loading, error },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }
    return <FeatureList data={official?.features || []} loading={loading} />
  }
}

export default withFeatureFlag(FeatureFlagPage)
