import * as React from 'react'
import { Button, Modal, message, Tag } from 'antd'

import { UserDigest } from '../../../definitions'
import withToggleUsersBadge, { ChildProps } from './withToggleUsersBadge'
import { USER_BADGES } from '../enums'

interface BaseProps {
  users: UserDigest[]
  type: string
  enabled: boolean
  callback?: () => void
}

type Props = BaseProps & ChildProps

interface State {
  mutationLoading: boolean
}

class ToggleUsersBadgeButton extends React.Component<Props, State> {
  state = {
    mutationLoading: false,
  }

  _onDelete = () => {
    const { callback, enabled, type, mutate, users } = this.props
    const text = enabled ? '新增' : '刪除'

    if (!users || users.length === 0) {
      return
    }

    const ids = users.map(({ id }) => id)

    Modal.confirm({
      title: `確認${text}${USER_BADGES[type].text}徽章？`,
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
                type,
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
        type={enabled ? 'primary' : 'danger'}
        size="small"
        onClick={this._onDelete}
        disabled={!hasSelected || mutationLoading}
      >
        {enabled ? '新增' : '刪除'}
      </Button>
    )
  }
}

export default withToggleUsersBadge(ToggleUsersBadgeButton)
