import * as React from 'react'
import { Select, Button, Modal, Alert, Input, message } from 'antd'
import _get from 'lodash/get'
import { ModalFuncProps } from 'antd/lib/modal'

import ErrorMessage from '../../ErrorMessage'
import UserStateTag from '../StateTag'

import withSetState, { ChildProps, UserState } from './withSetState'
import { getErrorCodes } from '../../../utils'

type SetStateState = {
  userState: UserState
  banDays: string
  password: string
  loading: boolean
  error: any
}

const USER_STATES: { key: UserState; text: string; disabled?: boolean }[] = [
  { key: 'active', text: '正常' },
  { key: 'archived', text: '註銷' },
  { key: 'banned', text: '禁言' },
  { key: 'frozen', text: '凍結' },
  { key: 'forbidden', text: '封禁' },
  { key: 'onboarding', text: '未激活' },
]
const BAN_DAYS: { key: string; text: string }[] = [
  { key: '-1', text: '一直' },
  { key: '1', text: '1 天' },
  { key: '3', text: '3 天' },
  { key: '7', text: '7 天' },
  { key: '14', text: '14 天' },
  { key: '30', text: '30 天' },
  { key: '60', text: '60 天' },
  { key: '90', text: '90 天' },
  { key: '180', text: '180 天' }
]

class SetState extends React.Component<ChildProps, SetStateState> {
  state: Readonly<SetStateState> = {
    userState: this.props.state,
    banDays: BAN_DAYS[0].key,
    password: '',
    loading: false,
    error: null
  }

  private _onSelectUserState = (value: UserState) => {
    this.setState({ userState: value }, () => {
      if (this.props.state !== value) {
        this.preConfirm()
      }
    })
  }

  private _onSelectBanDays = (value: string) => {
    this.setState({ banDays: value })
  }

  private _onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ password: event.target.value })
  }

  private _onConfirmhange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props
    const { userState, password } = this.state
    const banDays = parseInt(this.state.banDays, 10)

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            state: userState,
            banDays:
              userState === 'banned' && banDays > 0 ? banDays : undefined,
            password
          }
        }
      })
      const newUserState = _get(result, 'data.updateUserState.status.state')
      this.setState({ userState: newUserState, loading: false, error: null })
    } catch (error) {
      const errorCodes = getErrorCodes(error)

      if (errorCodes.indexOf('BAD_USER_INPUT') >= 0) {
        message.error('輸入有誤')
        this.setState({ loading: false })
      } else if (errorCodes.indexOf('USER_PASSWORD_INVALID') >= 0) {
        message.error('密碼輸入有誤')
        this.setState({ loading: false })
      } else {
        this.setState({ loading: false, error })
      }
    }
  }

  private preConfirm = () => {
    const { state, userName } = this.props
    const { userState, password, banDays } = this.state
    const isBanned = userState === 'banned'
    const isArchived = userState === 'archived'
    const isForbidden = userState === 'forbidden'

    let modalProps: ModalFuncProps = {
      title: `確認修改用戶狀態？`,
      content: (
        <>
          <div style={{ marginTop: 16 }}>
            <span>
              修改後，用戶狀態將從&nbsp;&nbsp;
              <UserStateTag state={state} />
              改為&nbsp;&nbsp;
              <UserStateTag state={userState} />
            </span>
          </div>

          {isBanned && (
            <div style={{ marginTop: 16 }}>
              <Select
                value={banDays}
                onSelect={this._onSelectBanDays}
                style={{ marginRight: 8 }}
              >
                {BAN_DAYS.map(({ key, text }) => (
                  <Select.Option key={key} disabled>
                    {text}
                  </Select.Option>
                ))}
              </Select>
            </div>
          )}
        </>
      )
    }

    if (isArchived || isForbidden) {
      modalProps = {
        title: `註銷用戶 ${userName}`,
        content: (
          <>
            <div style={{ marginTop: 16 }}>
              <span>
                确认注销账户吗？此步骤之后将不可撤回，而且被註銷帳戶（
                <strong>{this.props.userName}</strong>）無法恢復。
              </span>
            </div>

            <div style={{ marginTop: 16 }}>
              <Input.Password
                placeholder="密碼"
                onChange={this._onChangePassword}
              ></Input.Password>
            </div>
          </>
        )
      }
    }

    Modal.confirm({
      ...modalProps,
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmhange()
      },
      onCancel: this.revertChange
    })
  }

  private revertChange = () => {
    this.setState({ userState: this.props.state, banDays: BAN_DAYS[0].key })
  }

  public render() {
    const { userState, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <Select
          value={userState}
          onSelect={this._onSelectUserState}
          style={{ marginRight: 8 }}
        >
          {USER_STATES.map(({ key, text, disabled }) => (
            <Select.Option key={key} disabled={disabled}>
              {text}
            </Select.Option>
          ))}
        </Select>
      </span>
    )
  }
}

export default withSetState(SetState)
