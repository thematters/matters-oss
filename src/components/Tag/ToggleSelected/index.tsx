import * as React from 'react'
import { Switch } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import withToggleSelected, { ChildProps } from './withToggleSelected'

type ToggleSelectedState = {
  checked: boolean
  loading: boolean
  error: any
}

class ToggleSelected extends React.Component<ChildProps, ToggleSelectedState> {
  state: Readonly<ToggleSelectedState> = {
    checked: this.props.checked,
    loading: false,
    error: null,
  }

  private _onChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, tagId } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id: tagId,
            enabled: !this.state.checked,
          },
        },
      })
      const selected = _get(result, 'data.toggleTagRecommend.oss.selected')
      this.setState({ checked: selected, loading: false, error: null })
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

export default withToggleSelected(ToggleSelected)
