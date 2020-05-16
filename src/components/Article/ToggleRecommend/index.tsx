import * as React from 'react'
import { Switch } from 'antd'
import _get from 'lodash/get'
import _capitalize from 'lodash/capitalize'

import ErrorMessage from '../../ErrorMessage'
import withToggleRecommend, { ChildProps } from './withToggleRecommend'

type ToggleRecommendState = {
  checked: boolean
  loading: boolean
  error: any
}

class ToggleRecommend extends React.Component<
  ChildProps,
  ToggleRecommendState
> {
  state: Readonly<ToggleRecommendState> = {
    checked: this.props.checked,
    loading: false,
    error: null,
  }

  private _onChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, articleId, type } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id: articleId,
            enabled: !this.state.checked,
            type,
          },
        },
      })
      const inRecommendType = _get(
        result,
        `data.toggleArticleRecommend.oss.inRecommend${_capitalize(type)}`
      )
      this.setState({
        checked: inRecommendType,
        loading: false,
        error: null,
      })
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

export default withToggleRecommend(ToggleRecommend)
