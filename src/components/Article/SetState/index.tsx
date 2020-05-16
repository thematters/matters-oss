import * as React from 'react'
import { Select, Button, Modal, Alert } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import ArticleStateTag from '../StateTag'

import withSetState, { ChildProps, ArticleState } from './withSetState'

type SetStateState = {
  articleState: ArticleState
  loading: boolean
  error: any
}

const ARTICLE_STATES: {
  key: ArticleState
  text: string
  disabled?: boolean
}[] = [
  { key: 'active', text: '正常' },
  { key: 'archived', text: '隱藏', disabled: true },
  { key: 'banned', text: '強制隱藏' },
]

class SetState extends React.Component<ChildProps, SetStateState> {
  state: Readonly<SetStateState> = {
    articleState: this.props.state,
    loading: false,
    error: null,
  }

  private _onSelectArticleState = (value: ArticleState) => {
    this.setState({ articleState: value }, () => {
      if (this.props.state !== value) {
        this.preConfirm()
      }
    })
  }

  private _onConfirmChange = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props
    const { articleState } = this.state

    try {
      const result = await mutate({
        variables: {
          input: {
            id,
            state: articleState,
          },
        },
      })
      const newArticleState = _get(result, 'data.updateArticleState.state')
      this.setState({
        articleState: newArticleState,
        loading: false,
        error: null,
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private preConfirm = () => {
    Modal.confirm({
      title: `確認修改文章狀態？`,
      content: (
        <div style={{ marginTop: 16 }}>
          <span>
            修改後，文章狀態將從&nbsp;&nbsp;
            <ArticleStateTag state={this.props.state} />
            改為&nbsp;&nbsp;
            <ArticleStateTag state={this.state.articleState} />
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
    this.setState({ articleState: this.props.state })
  }

  public render() {
    const { articleState, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <span>
        <Select
          value={articleState}
          onSelect={this._onSelectArticleState}
          style={{ marginRight: 8, width: 100 }}
        >
          {ARTICLE_STATES.map(({ key, text, disabled }) => (
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
