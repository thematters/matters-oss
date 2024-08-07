import React from 'react'

import ErrorMessage from '../../components/ErrorMessage'
import CampaignDigestList from '../../components/Campaign/DigestList'
import withCampaignList, { CampaignListChildProps } from './withCampaignList'

import { CampaignDigest } from '../../definitions'
import AddButton from '../../components/Campaign/AddButton'

class CampaignList extends React.Component<CampaignListChildProps> {
  private _renderHeader() {
    return <AddButton onSuccess={this.props.data.refetch} />
  }

  private _renderContent() {
    const {
      data: { campaigns, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: CampaignDigest[] = []
    let totalCount: number = 0

    if (campaigns) {
      listData = campaigns.edges.map(({ node }) => node)
      totalCount = campaigns.totalCount
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
    return (
      <>
        {this._renderHeader()}
        {this._renderContent()}
      </>
    )
  }
}

export default withCampaignList(CampaignList)
