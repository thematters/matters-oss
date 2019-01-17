import * as React from 'react'
import _get from 'lodash/get'

import SetBoost from '../../SetBoost'

import withSetUserBoost, { ChildProps } from './withSetUserBoost'

type SetUserBoostState = {
  loading: boolean
  error: any
}

class SetUserBoost extends React.Component<ChildProps, SetUserBoostState> {
  state: Readonly<SetUserBoostState> = {
    loading: false,
    error: null
  }

  private _onSubmit = async (value: number) => {
    this.setState({ loading: true, error: null })

    const { mutate, userId } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id: userId,
            boost: value
          }
        }
      })
      // const newBoost = _get(result, 'data.setUserBoost.oss.boost')
      this.setState({ loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  public render() {
    const { loading, error } = this.state

    return (
      <SetBoost
        boost={this.props.boost}
        onSubmit={this._onSubmit}
        error={error}
        loading={loading}
      />
    )
  }
}

export default withSetUserBoost(SetUserBoost)
