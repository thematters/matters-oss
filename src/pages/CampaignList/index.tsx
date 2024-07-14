import React from 'react'

import ErrorMessage from '../../components/ErrorMessage'
import CampaignDigestList from '../../components/Campaign/DigestList'
import withCampaignList, { CampaignListChildProps } from './withCampaignList'

import { CampaignDigest } from '../../definitions'

class CampaignList extends React.Component<CampaignListChildProps> {
  private _renderContent() {
    const {
      data: { oss, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: CampaignDigest[] = []
    let totalCount: number = 0

    if (oss) {
      listData = oss.campaigns.edges.map(({ node }) => node)
      totalCount = oss.campaigns.totalCount
    }

    return (
      <CampaignDigestList
        data={listData}
        loading={loading}
        pagination={{ totalCount, fetchMore, variables }}
      />
    )
  }

  public render() {
    return <>{this._renderContent()}</>
  }
}

export default withCampaignList(CampaignList)
