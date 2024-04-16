import * as React from 'react'
import { Input, message } from 'antd'

import { toGlobalId } from '../../../utils'
import ErrorMessage from '../../ErrorMessage'
import withAddArticle, { ChildProps } from './withAddArticle'

const { Search } = Input

type AddArticleState = {
  articleInput: string
  loading: boolean
  error: any
}

class AddArticle extends React.Component<ChildProps, AddArticleState> {
  state: Readonly<AddArticleState> = {
    articleInput: '',
    loading: false,
    error: null,
  }

  private _getArticleId = (input: string): string | null => {
    let _input = input
    const isLink = input.startsWith('http')
    if (isLink) {
      _input =
        input
          .split('#')[0]
          .split('?')[0]
          .split('/')
          .slice(-1)[0]
          .split('-')[0] ?? ''
    }
    const id = parseInt(_input)
    if (id) {
      return toGlobalId({ type: 'Article', id })
    } else {
      return null
    }
  }

  private _onSubmit = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id, articleIds } = this.props
    const { articleInput } = this.state
    const articleId = this._getArticleId(articleInput)

    if (articleId && !articleIds.includes(articleId)) {
      try {
        await mutate({
          variables: {
            input: {
              id,
              articles: [...articleIds, articleId],
            },
          },
        })
        this.setState({ loading: false, error: null }, async () => {
          message.success('添加文章成功')
        })
      } catch (error) {
        this.setState({ loading: false, error })
      }
    } else {
      this.setState({ loading: false, error: null }, () => {
        if (articleIds.includes(articleId ?? '')) {
          message.error('文章已添加到專題')
        } else {
          message.error('非法輸入')
        }
      })
    }
  }

  private _onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ articleInput: event.target.value })
  }

  public render() {
    const { articleInput, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Search
        onChange={this._onChange}
        onSearch={this._onSubmit}
        value={articleInput}
        // url max length
        maxLength={2048}
        size="small"
        enterButton=" 添加"
        disabled={loading}
      />
    )
  }
}

export default withAddArticle(AddArticle)
