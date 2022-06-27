import * as React from 'react'
import { Button, Modal, message, Tag } from 'antd'

import withResetWallet, { ChildProps } from './withResetWallet'
import { ApolloError } from 'apollo-client'

type ResetWalletState = {
  loading: boolean
  error: any
}

class ResetWallet extends React.Component<ChildProps> {
  state: Readonly<ResetWalletState> = {
    loading: false,
    error: null,
  }

  private action = async (resetWallet: any): Promise<any> => {
    const { id } = this.props
    if (!resetWallet) {
      return
    }

    this.setState((prev) => ({
      ...prev,
      loading: true,
      error: null,
    }))

    try {
      const result = await resetWallet({
        variables: {
          input: {
            id,
          },
        },
      })
      message.success('重置成功')
    } catch (error) {
      this.setState(
        (prev) => ({ ...prev, loading: false, error }),
        () => {
          if (error instanceof ApolloError) {
            message.error(`重置失敗: ${error}`)
          } else {
            message.error('重置失敗')
          }
        }
      )
    }
  }

  private _onReset = async () => {
    const { mutate, ethAddress } = this.props
    Modal.confirm({
      title: `確認重置此用户加密錢包？`,
      cancelText: '取消',
      okText: '確認重置',
      onOk: async () => {
        await this.action(mutate)
      },
    })
  }

  public render() {
    const { loading } = this.state
    const { ethAddress } = this.props

    return (
      <Button
        type="default"
        onClick={() => this._onReset()}
        disabled={loading || !ethAddress}
      >
        重置
      </Button>
    )
  }
}

export default withResetWallet(ResetWallet)
