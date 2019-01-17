import * as React from 'react'
import { InputNumber, Button } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
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

  private _onChange = (value: number | undefined) => {
    if (!value || Number.isNaN(value)) {
      return
    }

    this.setState({ boost: value })
  }

  private _onClick = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, articleId } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id: articleId,
            boost: this.state.boost
          }
        }
      })
      const newBoost = _get(result, 'data.setArticleBoost.oss.boost')
      this.setState({ boost: newBoost, loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
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
          onClick={this._onClick}
          type="primary"
          size="small"
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
