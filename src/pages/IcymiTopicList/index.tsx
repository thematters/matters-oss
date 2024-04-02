import * as React from 'react'
import ErrorMessage from '../../components/ErrorMessage'
import AddButton from '../../components/IcymiTopic/DigestList/AddButton'
import DigestList from '../../components/IcymiTopic/DigestList'
import { IcymiTopicDigest } from '../../definitions'
import withIcymiTopicList, {
  IcymiTopicListChildProps,
} from './withIcymiTopicList'

class IcymiTopicList extends React.Component<IcymiTopicListChildProps> {
  private _renderHeader() {
    return <AddButton onSuccess={this.props.data.refetch} />
  }
  private _renderContent() {
    const {
      data: { oss, loading, error, fetchMore, variables },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    let listData: IcymiTopicDigest[] = []
    let totalCount: number = 0
    if (oss && oss.icymiTopics) {
      listData = oss.icymiTopics.edges.map(({ node }) => node)
      totalCount = oss.icymiTopics.totalCount
    }

    return (
      <DigestList
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

export default withIcymiTopicList(IcymiTopicList)
