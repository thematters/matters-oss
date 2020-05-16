import * as React from 'react'
import { Input, Button } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../ErrorMessage'
import withPutRemark, { ChildProps } from './withPutRemark'

type RemarkState = {
  _remark: string
  remark: string
  loading: boolean
  error: any
}

class SetBoost extends React.Component<ChildProps, RemarkState> {
  state: Readonly<RemarkState> = {
    _remark: this.props.remark,
    remark: this.props.remark,
    loading: false,
    error: null,
  }

  private _onSubmit = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id, type } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            remark: this.state.remark,
            type,
          },
        },
      })
      const newRemark = _get(result, 'data.putRemark')
      this.setState({
        remark: newRemark,
        _remark: newRemark,
        loading: false,
        error: null,
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private _onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    this.setState({ remark: value })
  }

  public render() {
    const { remark, _remark, loading, error } = this.state
    const remarkChanged = _remark !== remark

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <>
        <Input.TextArea
          onChange={this._onChange}
          value={remark}
          autosize={{ minRows: 4 }}
          style={{ margin: '4px', verticalAlign: 'middle' }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            onClick={this._onSubmit}
            type="primary"
            loading={loading}
            disabled={!remarkChanged}
            style={{
              margin: '4px',
              verticalAlign: 'middle',
              opacity: remarkChanged ? 1 : 0,
            }}
          >
            保存
          </Button>
        </div>
      </>
    )
  }
}

export default withPutRemark(SetBoost)
