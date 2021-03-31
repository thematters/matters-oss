import * as React from 'react'
import { Button, Modal, message, Tag } from 'antd'

import { UserDigest } from '../../../definitions'
import withToggleSeedingUsers, { ChildProps } from './withToggleSeedingUsers'

interface BaseProps {
  users: UserDigest[]
  enabled: boolean
  callback?: () => void
}

type Props = BaseProps & ChildProps

interface State {
  mutationLoading: boolean
}

class ToggleSeedingUsersButton extends React.Component<Props, State> {
  state = {
    mutationLoading: false,
  }

  _onDelete = () => {
    const { callback, enabled, mutate, users } = this.props
    const text = enabled ? '添加' : '刪除'

    if (!users || users.length === 0) {
      return
    }

    const ids = users.map(({ id }) => id)

    Modal.confirm({
      title: `確認${text}以下內測種子用戶？`,
      content: (
        <div style={{ marginTop: 16 }}>
          {users.map(({ displayName, userName }) => (
            <Tag style={{ marginBottom: 8 }}>
              {displayName} (@{userName})
            </Tag>
          ))}
        </div>
      ),
      cancelText: '取消',
      okText: `確認${text}`,
      onOk: async () => {
        try {
          await mutate({
            variables: {
              input: {
                ids,
                enabled,
              },
            },
          })

          message.success(`${text}成功`)

          if (callback) {
            callback()
          }
        } catch (error) {
          this.setState({ mutationLoading: false }, () => {
            message.error(`${text}失敗`)
          })
        }
      },
    })
  }

  public render() {
    const { enabled, users } = this.props
    const { mutationLoading } = this.state
    const hasSelected = (users || []).length > 0
    return (
      <Button
        type="primary"
        onClick={this._onDelete}
        disabled={!hasSelected || mutationLoading}
      >
        {enabled ? '添加' : '刪除'}
      </Button>
    )
  }
}

export default withToggleSeedingUsers(ToggleSeedingUsersButton)
