import * as React from 'react'
import { InputNumber, Button } from 'antd'

import ErrorMessage from '../ErrorMessage'
import withSetFeature, { ChildProps } from './withSetFeature'

type SetFeatureValueState = {
  value: number | null
  loading: boolean
  error: any
}

class SetFeatureValue extends React.Component<
  ChildProps,
  SetFeatureValueState
> {
  state: Readonly<SetFeatureValueState> = {
    value: this.props.value,
    loading: false,
    error: null,
  }

  private _onSubmit = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, name, enabled } = this.props

    try {
      await mutate({
        variables: {
          input: {
            value: this.state.value,
            flag: enabled ? 'on' : 'off',
            name,
          },
        },
      })
      this.setState({ loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private _onChange = (value: number | undefined) => {
    if (!value || Number.isNaN(value)) {
      return
    }
    this.setState({ value })
  }

  public render() {
    const { value, loading, error } = this.state
    const valueChanged = this.props.value !== value

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <InputNumber
          onChange={this._onChange}
          value={value || 1}
          min={0}
          max={1}
          step={0.01}
          type="number"
          size="small"
          style={{ margin: '4px', verticalAlign: 'middle' }}
        />
        <Button
          onClick={this._onSubmit}
          type="primary"
          size="small"
          loading={loading}
          disabled={!valueChanged}
          style={{
            margin: '4px',
            verticalAlign: 'middle',
            fontSize: 12,
            opacity: valueChanged ? 1 : 0,
          }}
        >
          確認
        </Button>
      </span>
    )
  }
}

export default withSetFeature(SetFeatureValue)
