import * as React from 'react'
import { InputNumber, Button } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../ErrorMessage'
import withSetBoost, { ChildProps } from './withSetBoost'

type SetBoostState = {
  boost: number
  loading: boolean
  error: any
}

class SetBoost extends React.Component<ChildProps, SetBoostState> {
  state: Readonly<SetBoostState> = {
    boost: this.props.boost,
    loading: false,
    error: null
  }

  private _onSubmit = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id, type } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            boost: this.state.boost,
            type
          }
        }
      })
      // const newBoost = _get(result, 'data.SetArticleBoost.oss.boost')
      this.setState({ loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private _onChange = (value: number | undefined) => {
    if (!value || Number.isNaN(value)) {
      return
    }
    this.setState({ boost: value })
  }

  public render() {
    const { boost, loading, error } = this.state
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
          onClick={this._onSubmit}
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

export default withSetBoost(SetBoost)
