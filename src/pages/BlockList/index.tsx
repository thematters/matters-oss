import * as React from 'react'
import _get from 'lodash/get'

import SearchBar from '../../components/SearchBar'
import ErrorMessage from '../../components/ErrorMessage'
import BlockListItemDigestList from '../../components/BlockList/DigestList'
import withBlockList, { AllBlockListItemsChildProps } from './withBlockList'

import { BlockListItemDigest } from '../../definitions'

class BlockList extends React.Component<AllBlockListItemsChildProps> {
  private _renderContent() {
    const {
      data: { oss, loading, error, fetchMore, variables }
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: BlockListItemDigest[] = []
    let totalCount: number = 0
    if (oss) {
      listData = oss.agentHashes.edges.map(({ node }) => node)
      totalCount = oss.agentHashes.totalCount
    }

    return (
      <BlockListItemDigestList
        data={listData}
        loading={loading}
        pagination={{ totalCount, fetchMore, variables }}
      />
    )
  }

  public render() {
    return (
      <>
        {this._renderContent()}
      </>
    )
  }
}

export default withBlockList(BlockList)
