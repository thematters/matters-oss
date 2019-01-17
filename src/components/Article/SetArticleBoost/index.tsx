import * as React from 'react'
import _get from 'lodash/get'

import SetBoost from '../../SetBoost'

import withSetArticleBoost, { ChildProps } from './withSetArticleBoost'

type SetArticleBoostState = {
  loading: boolean
  error: any
}

class SetArticleBoost extends React.Component<
  ChildProps,
  SetArticleBoostState
> {
  state: Readonly<SetArticleBoostState> = {
    loading: false,
    error: null
  }

  private _onSubmit = async (value: number) => {
    console.log(value)
    this.setState({ loading: true, error: null })

    const { mutate, articleId } = this.props

    try {
      const result = await mutate({
        variables: {
          input: {
            id: articleId,
            boost: value
          }
        }
      })
      // const newBoost = _get(result, 'data.SetArticleBoost.oss.boost')
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

export default withSetArticleBoost(SetArticleBoost)
