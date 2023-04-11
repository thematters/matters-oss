import { Button, message } from 'antd'
import * as React from 'react'
import withSetRestriction, { ChildProps } from './withSetRestriction'

type RemoveAllRestrictionState = {
  loading: boolean
  error: any
}

class RemoveAllRestrictionButton extends React.Component<
  ChildProps,
  RemoveAllRestrictionState
> {
  state: Readonly<RemoveAllRestrictionState> = {
    loading: false,
    error: null,
  }
  private _handleClick = async () => {
    this.setState({ loading: true, error: null })
    const { mutate, userId } = this.props
    try {
      await mutate({
        variables: { input: { ids: [userId], restrictions: [] } },
      })
      this.setState({ loading: false, error: null })
    } catch (e) {
      message.error(e)
      this.setState({ loading: false, error: e })
    }
  }
  public render() {
    return (
      <Button loading={this.state.loading} onClick={this._handleClick}>
        解除管制
      </Button>
    )
  }
}

export default withSetRestriction(RemoveAllRestrictionButton)
