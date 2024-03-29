import * as React from 'react'
import _get from 'lodash/get'
import { Row } from 'antd'

import ErrorMessage from '../../components/ErrorMessage'
import BlockListItemDigestList from '../../components/BlockList/DigestList'
import withDomainBlockList, {
  AllBlockListItemsChildProps,
} from './withDomainBlockList'

import { BlockListItemDigest } from '../../definitions'
import BlockDomainForm from './BlockDomainForm'
import Divider from '../../components/Divider'

class BlockList extends React.Component<AllBlockListItemsChildProps> {
  private _renderHeader() {
    return (
      <>
        <Row>
          <BlockDomainForm />
        </Row>
        <Divider size="large" />
      </>
    )
  }

  private _renderContent() {
    const {
      data: { oss, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: BlockListItemDigest[] = []
    let totalCount: number = 0
    if (oss) {
      listData = oss.skippedListItems.edges.map(({ node }) => node)
      totalCount = oss.skippedListItems.totalCount
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
        {this._renderHeader()}
        {this._renderContent()}
      </>
    )
  }
}

export default withDomainBlockList(BlockList)
