import * as React from 'react'
import { Skeleton, Empty } from 'antd'

import ErrorMessage from '../../components/ErrorMessage'

import CampaignEditor from '../../components/Campaign/Editor'

import withCampaignDetail, {
  CampaignDetailChildProps,
} from '../CampaignDetail/withCampaignDetail'

class CampaignEdit extends React.Component<CampaignDetailChildProps> {
  public render() {
    const {
      data: { campaign, loading, error },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    if (loading) {
      return <Skeleton active />
    }

    if (!campaign) {
      return <Empty />
    }

    return (
      <>
        <CampaignEditor campaign={campaign} />
      </>
    )
  }
}

export default withCampaignDetail(CampaignEdit)
