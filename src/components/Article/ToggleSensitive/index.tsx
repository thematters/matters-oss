import * as React from 'react'
import { Switch } from 'antd'

import ErrorMessage from '../../ErrorMessage'
import withToggleSensitive, { ChildProps } from './withToggleSensitive'

type ToggleSensitiveState = {
  checked: boolean
  loading: boolean
  error: any
}

class ToggleSensitive extends React.Component<
  ChildProps,
  ToggleSensitiveState
> {
  state: Readonly<ToggleSensitiveState> = {
    checked: this.props.checked,
    loading: false,
    error: null,
  }

  private _onChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, articleId } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id: articleId,
            sensitive: !this.state.checked,
          },
        },
      })
      this.setState({
        checked: !this.state.checked,
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

export default withToggleSensitive(ToggleSensitive)
