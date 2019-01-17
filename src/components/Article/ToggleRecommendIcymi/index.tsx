import * as React from 'react'
import { Switch } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import withToggleRecommendIcymi, {
  ChildProps
} from './withToggleRecommendIcymi'

type ToggleRecommendIcymiState = {
  checked: boolean
  loading: boolean
  error: any
}

class ToggleRecommendIcymi extends React.Component<
  ChildProps,
  ToggleRecommendIcymiState
> {
  state: Readonly<ToggleRecommendIcymiState> = {
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
      const inRecommendIcymi = _get(
        result,
        'data.toggleRecommendIcymi.oss.inRecommendIcymi'
      )
      this.setState({ checked: inRecommendIcymi, loading: false, error: null })
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

export default withToggleRecommendIcymi(ToggleRecommendIcymi)
