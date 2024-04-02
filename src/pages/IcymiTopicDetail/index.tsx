import * as React from 'react'

import withIcymiTopicDetail, {
  IcymiTopicDetailChildProps,
} from './withIcymiTopic'
// import Detail from '../../components/Announcement/Detail'
import ErrorMessage from '../../components/ErrorMessage'

class IcymiTopicDetail extends React.Component<IcymiTopicDetailChildProps> {
  public render() {
    const {
      data: { node, loading, error },
    } = this.props

    if (error) {
      return <ErrorMessage error={error} />
    }

    console.log(node)

    return <span>"helloworld"</span>
    // return <Detail data={node} loading={loading} />
  }
}

export default withIcymiTopicDetail(IcymiTopicDetail)
