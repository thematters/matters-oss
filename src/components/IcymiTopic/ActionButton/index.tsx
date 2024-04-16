import * as React from 'react'
import { Button, message } from 'antd'

import ErrorMessage from '../../ErrorMessage'
import withActionButton, { ChildProps } from './withActionButton'
import { PATH } from '../../../constants'

type ActionButtonState = {
  loading: boolean
  error: any
}

class ActionButton extends React.Component<ChildProps, ActionButtonState> {
  state: Readonly<ActionButtonState> = {
    loading: false,
    error: null,
  }

  private _is_delete =
    this.props.currentState === 'editing' && this.props.newState === 'archived'
  private _is_publish =
    this.props.currentState === 'editing' && this.props.newState === 'published'
  private _is_archive =
    this.props.currentState === 'published' &&
    this.props.newState === 'archived'

  private _onSubmit = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props

    try {
      await mutate({
        variables: {
          input: {
            id,
            state: this.props.newState,
          },
        },
      })
      this.setState({ loading: false, error: null }, () => {
        if (this._is_delete) {
          window.location.href = PATH.HOMEPAGE_ICYMI_TOPICS
          message.success('刪除專題成功')
        } else if (this._is_publish) {
          message.success('發佈專題成功')
        } else if (this._is_archive) {
          message.success('下架專題成功')
        } else {
          message.error('未知錯誤')
        }
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  public render() {
    const { loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Button onClick={this._onSubmit} size="large" loading={loading}>
        {this._is_delete && '刪除'}
        {this._is_publish && '發佈'}
        {this._is_archive && '下架'}
      </Button>
    )
  }
}

export default withActionButton(ActionButton)
