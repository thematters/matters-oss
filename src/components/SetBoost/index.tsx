import * as React from 'react'
import { InputNumber, Button } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../ErrorMessage'

type SetBoostProps = {
  boost: number
  onSubmit: any
  error: any
  loading: boolean
}

type SetBoostState = {
  boost: number
}

class SetBoost extends React.Component<SetBoostProps, SetBoostState> {
  state: Readonly<SetBoostState> = {
    boost: this.props.boost
  }

  private _onChange = (value: number | undefined) => {
    if (!value || Number.isNaN(value)) {
      return
    }

    this.setState({ boost: value })
  }

  public render() {
    const { loading, error, onSubmit } = this.props
    const { boost } = this.state
    const boostChanged = this.props.boost !== boost

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <InputNumber
          onChange={this._onChange}
          value={boost}
          min={0}
          step={0.01}
          type="number"
          size="small"
          style={{ margin: '4px', verticalAlign: 'middle' }}
        />
        <Button
          onClick={() => onSubmit(boost)}
          type="primary"
          size="small"
          loading={loading}
          disabled={!boostChanged}
          style={{
            margin: '4px',
            verticalAlign: 'middle',
            fontSize: 12,
            opacity: boostChanged ? 1 : 0
          }}
        >
          確認
        </Button>
      </span>
    )
  }
}

export default SetBoost
