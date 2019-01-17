import * as React from 'react'
import { Switch } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import withToggleRecommendToday, {
  ChildProps
} from './withToggleRecommendToday'

type ToggleRecommendTodayState = {
  checked: boolean
  loading: boolean
  error: any
}

class ToggleRecommendToday extends React.Component<
  ChildProps,
  ToggleRecommendTodayState
> {
  state: Readonly<ToggleRecommendTodayState> = {
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
      const inRecommendToday = _get(
        result,
        'data.toggleRecommendToday.oss.inRecommendToday'
      )
      this.setState({ checked: inRecommendToday, loading: false, error: null })
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

export default withToggleRecommendToday(ToggleRecommendToday)
