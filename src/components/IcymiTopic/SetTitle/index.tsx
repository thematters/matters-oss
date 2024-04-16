import * as React from 'react'
import { Input, Button, message } from 'antd'

import ErrorMessage from '../../ErrorMessage'
import withSetTitle, { ChildProps } from './withSetTitle'

type SetTitleState = {
  title: string
  loading: boolean
  error: any
}

class SetTitle extends React.Component<ChildProps, SetTitleState> {
  state: Readonly<SetTitleState> = {
    title: this.props.title,
    loading: false,
    error: null,
  }

  private _onSubmit = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props

    try {
      await mutate({
        variables: {
          input: {
            id,
            title: this.state.title,
          },
        },
      })
      this.setState({ loading: false, error: null }, () => {
        message.success('專題名稱更新成功')
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value })
  }

  public render() {
    const { title, loading, error } = this.state
    const changed = this.props.title !== title

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <>
        <Input
          onChange={this._onChange}
          value={title}
          maxLength={20}
          size="small"
          style={{ margin: '4px', verticalAlign: 'middle' }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            onClick={this._onSubmit}
            type="primary"
            size="small"
            loading={loading}
            disabled={!changed}
            style={{
              fontSize: 12,
              verticalAlign: 'middle',
              opacity: changed ? 1 : 0,
            }}
          >
            保存
          </Button>
        </div>
      </>
    )
  }
}

export default withSetTitle(SetTitle)
