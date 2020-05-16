import * as React from 'react'
import { Select, Button, Modal, Alert } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import UserRoleTag from '../RoleTag'

import withSetRole, { ChildProps, UserRole } from './withSetRole'

type SetRoleState = {
  userRole: UserRole
  loading: boolean
  error: any
}

const USER_ROLES: { key: UserRole; text: string; disabled?: boolean }[] = [
  { key: 'user', text: '用戶' },
  { key: 'admin', text: '管理員' },
]

class SetState extends React.Component<ChildProps, SetRoleState> {
  state: Readonly<SetRoleState> = {
    userRole: this.props.role,
    loading: false,
    error: null,
  }

  private _onSelectUserRole = (value: UserRole) => {
    this.setState({ userRole: value }, () => {
      if (this.props.role !== value) {
        this.preConfirm()
      }
    })
  }

  private _onConfirmhange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props
    const { userRole } = this.state

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            role: userRole,
          },
        },
      })
      const newUserRole = _get(result, 'data.updateUserRole.status.role')
      this.setState({ userRole: newUserRole, loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private preConfirm = () => {
    Modal.confirm({
      title: `確認修改用戶權限？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            修改後，用戶權限將從&nbsp;&nbsp;
            <UserRoleTag role={this.props.role} />
            改為&nbsp;&nbsp;
            <UserRoleTag role={this.state.userRole} />
          </span>
        </div>
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmhange()
      },
      onCancel: this.revertChange,
    })
  }

  private revertChange = () => {
    this.setState({ userRole: this.props.role })
  }

  public render() {
    const { userRole, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <Select
          value={userRole}
          onSelect={this._onSelectUserRole}
          style={{ marginRight: 8 }}
        >
          {USER_ROLES.map(({ key, text, disabled }) => (
            <Select.Option key={key} disabled={disabled}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </span>
    )
  }
}

export default withSetRole(SetState)
