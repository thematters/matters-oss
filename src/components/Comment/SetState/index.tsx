import * as React from 'react'
import { Select, Modal, message } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import CommentStateTag from '../StateTag'

import withSetState, { ChildProps, CommentState } from './withSetState'

type SetStateState = {
  commentState?: CommentState
  loading: boolean
  error: any
}

const PLACEHOLDER_KEY = 'placeholder'

const COMMENT_STATES: {
  key: CommentState
  text: string
  disabled?: boolean
}[] = [
  { key: 'active', text: '正常' },
  { key: 'archived', text: '刪除', disabled: true },
  { key: 'banned', text: '強制隱藏' },
  { key: 'collapsed', text: '折疊' },
]

class SetState extends React.Component<ChildProps, SetStateState> {
  state: Readonly<SetStateState> = {
    commentState: this.props.commentState,
    loading: false,
    error: null,
  }

  private _onSelectCommentState = (
    value: CommentState | typeof PLACEHOLDER_KEY
  ) => {
    if (!value || value === PLACEHOLDER_KEY) {
      return
    }

    this.setState({ commentState: value }, () => {
      if (this.props.commentState !== value) {
        this.preConfirm()
      }
    })
  }

  private _onConfirmChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, ids, onSuccess } = this.props
    const { commentState } = this.state

    if (!commentState) {
      return
    }

    try {
      const result = await mutate({
        variables: {
          input: {
            ids,
            state: commentState,
          },
        },
      })
      const newCommentState = _get(result, 'data.updateCommentsState.0.state')
      this.setState({
        commentState: newCommentState,
        loading: false,
        error: null,
      })
      message.success('修改成功', 1, () => {
        if (onSuccess) {
          onSuccess()
        }
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private preConfirm = () => {
    Modal.confirm({
      title: `確認修改評論狀態？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            修改後，評論狀態將從&nbsp;&nbsp;
            {this.props.commentState && (
              <CommentStateTag state={this.props.commentState} />
            )}
            改為&nbsp;&nbsp;
            {this.state.commentState && (
              <CommentStateTag state={this.state.commentState} />
            )}
          </span>
        </div>
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmChange()
      },
      onCancel: this.revertChange,
    })
  }

  private revertChange = () => {
    this.setState({ commentState: this.props.commentState })
  }

  public render() {
    const { disabled } = this.props
    const { commentState, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <Select
          value={commentState}
          onSelect={this._onSelectCommentState}
          style={{ marginRight: 8, width: 100 }}
          loading={loading}
          disabled={disabled}
        >
          <Select.Option key={PLACEHOLDER_KEY} disabled></Select.Option>
          {COMMENT_STATES.map(({ key, text, disabled }) => (
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
