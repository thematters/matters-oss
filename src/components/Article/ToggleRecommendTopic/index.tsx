import * as React from 'react'
import { Switch } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import withToggleRecommendTopic, {
  ChildProps
} from './withToggleRecommendTopic'

type ToggleRecommendTopicState = {
  checked: boolean
  loading: boolean
  error: any
}

class ToggleRecommendTopic extends React.Component<
  ChildProps,
  ToggleRecommendTopicState
> {
  state: Readonly<ToggleRecommendTopicState> = {
    checked: this.props.checked,
    loading: false,
    error: null
  }

  private _onChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, articleId } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id: articleId,
            enabled: !this.state.checked
          }
        }
      })
      const inRecommendTopic = _get(
        result,
        'data.toggleRecommendTopic.oss.inRecommendTopic'
      )
      this.setState({ checked: inRecommendTopic, loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  public render() {
    const { checked, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Switch onChange={this._onChange} checked={checked} loading={loading} />
    )
  }
}

export default withToggleRecommendTopic(ToggleRecommendTopic)
