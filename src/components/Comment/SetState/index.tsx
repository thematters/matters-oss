import * as React from 'react'
import { Select, Button, Modal, Alert } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import CommentStateTag from '../StateTag'

import withSetState, { ChildProps, CommentState } from './withSetState'

type SetStateState = {
  commentState: CommentState
  loading: boolean
  error: any
}

const COMMENT_STATES: {
  key: CommentState
  text: string
  disabled?: boolean
}[] = [
  { key: 'active', text: '正常' },
  { key: 'archived', text: '隱藏', disabled: true },
  { key: 'banned', text: '強制隱藏' }
]

class SetState extends React.Component<ChildProps, SetStateState> {
  state: Readonly<SetStateState> = {
    commentState: this.props.state,
    loading: false,
    error: null
  }

  private _onSelectCommentState = (value: CommentState) => {
    this.setState({ commentState: value })
  }

  private _onConfirmChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props
    const { commentState } = this.state

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            state: commentState
          }
        }
      })
      const newCommentState = _get(result, 'data.updateCommentState.state')
      this.setState({
        commentState: newCommentState,
        loading: false,
        error: null
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private _onClickChange = () => {
    Modal.confirm({
      title: `確認修改文章狀態？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            修改後，文章狀態將從&nbsp;&nbsp;
            <CommentStateTag state={this.props.state} />
            改為&nbsp;&nbsp;
            <CommentStateTag state={this.state.commentState} />
          </span>
        </div>
      ),
      cancelText: '取消',
      okText: '確認',
      onOk: () => {
        this._onConfirmChange()
      }
    })
  }

  private _onClickRevertChange = () => {
    this.setState({ commentState: this.props.state })
  }

  public render() {
    const { commentState, loading, error } = this.state
    const commentStateChanged = this.props.state !== commentState

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <Select
          value={commentState}
          onSelect={this._onSelectCommentState}
          style={{ marginRight: 8, width: 100 }}
        >
          {COMMENT_STATES.map(({ key, text, disabled }) => (
            <Select.Option key={key} disabled={disabled}>
              {text}
            </Select.Option>
          ))}
        </Select>
        {commentStateChanged && (
          <Button
            onClick={this._onClickChange}
            type="primary"
            loading={loading}
            disabled={!commentStateChanged}
            style={{
              marginRight: 8
            }}
          >
            確認
          </Button>
        )}
        {commentStateChanged && (
          <Button
            onClick={this._onClickRevertChange}
            type="default"
            loading={loading}
            disabled={!commentStateChanged}
          >
            取消
          </Button>
        )}
      </span>
    )
  }
}

export default withSetState(SetState)
