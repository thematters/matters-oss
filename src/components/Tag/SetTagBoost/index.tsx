import * as React from 'react'
import _get from 'lodash/get'

import SetBoost from '../../SetBoost'

import withSetTagBoost, { ChildProps } from './withSetTagBoost'

type SetTagBoostState = {
  loading: boolean
  error: any
}

class SetTagBoost extends React.Component<ChildProps, SetTagBoostState> {
  state: Readonly<SetTagBoostState> = {
    loading: false,
    error: null
  }

  private _onSubmit = async (value: number) => {
    this.setState({ loading: true, error: null })

    const { mutate, tagId } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id: tagId,
            boost: value
          }
        }
      })
      // const newBoost = _get(result, 'data.setTagBoost.oss.boost')
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

export default withSetTagBoost(SetTagBoost)
