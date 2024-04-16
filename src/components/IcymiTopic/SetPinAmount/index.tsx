import type { RadioChangeEvent } from 'antd/lib/radio'

import * as React from 'react'
import { Radio, message } from 'antd'

import ErrorMessage from '../../ErrorMessage'
import withSetPinAmount, { ChildProps } from './withSetPinAmount'

type SetPinAmountState = {
  pinAmount: number
  loading: boolean
  error: any
}

class SetPinAmount extends React.Component<ChildProps, SetPinAmountState> {
  state: Readonly<SetPinAmountState> = {
    pinAmount: this.props.pinAmount,
    loading: false,
    error: null,
  }

  private _onChange = async (event: RadioChangeEvent) => {
    this.setState({ loading: true, error: null, pinAmount: event.target.value })

    const { mutate, id } = this.props

    try {
      await mutate({
        variables: {
          input: {
            id,
            pinAmount: event.target.value,
          },
        },
      })
      this.setState({ loading: false, error: null }, () => {
        message.success('顶置篇数更新成功')
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  public render() {
    const { pinAmount, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Radio.Group
        onChange={this._onChange}
        value={pinAmount}
        disabled={loading || this.props.disabled}
      >
        <Radio value={3}>3 篇顶置</Radio>
        <Radio value={6}>6 篇顶置</Radio>
      </Radio.Group>
    )
  }
}

export default withSetPinAmount(SetPinAmount)
