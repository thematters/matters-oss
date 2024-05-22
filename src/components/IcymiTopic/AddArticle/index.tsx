import type ApolloClient from 'apollo-client'

import * as React from 'react'
import { Input, message } from 'antd'
import _get from 'lodash/get'
import { ApolloConsumer } from 'react-apollo'

import { toGlobalId } from '../../../utils'
import ErrorMessage from '../../ErrorMessage'
import withAddArticle, { ChildProps } from './withAddArticle'
import { PATH_REGEXP } from '../../../constants'

import QUERY_ARTICLE from '../../../gql/queries/articleId.gql'

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

  private _getArticleId = async (
    input: string,
    client: ApolloClient<any>
  ): Promise<string | null> => {
    const isLink = input.startsWith('http') && input.includes('matters.town')
    if (isLink) {
      const path = input.split('matters.town')[1]
      if (PATH_REGEXP.articleDetail.test(path)) {
        const mediaHash = path.split('#')[0].split('?')[0].split('-').pop()
        const { data } = await client.query({
          query: QUERY_ARTICLE,
          variables: { input: { mediaHash } },
        })
        return _get(data, 'article.id') ?? null
      }

      if (PATH_REGEXP.articleDetailShortHash.test(path)) {
        const shortHash = path.split('/a/')[1]
        const { data } = await client.query({
          query: QUERY_ARTICLE,
          variables: { input: { shortHash } },
        })
        return _get(data, 'article.id') ?? null
      }
    }
    const id = parseInt(input)
    if (id) {
      return toGlobalId({ type: 'Article', id })
    } else {
      return null
    }
  }

  private _onSubmit = async (client: ApolloClient<any>) => {
    this.setState({ loading: true, error: null })

    const { mutate, id, articleIds } = this.props
    const { articleInput } = this.state

    const articleId = await this._getArticleId(articleInput, client)

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
      <ApolloConsumer>
        {(client) => (
          <Search
            onChange={this._onChange}
            onSearch={() => this._onSubmit(client)}
            value={articleInput}
            // url max length
            maxLength={2048}
            placeholder="輸入文章ID或連結"
            size="small"
            enterButton="添加"
            disabled={loading || this.props.disabled}
          />
        )}
      </ApolloConsumer>
    )
  }
}

export default withAddArticle(AddArticle)
