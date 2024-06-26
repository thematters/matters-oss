import type ApolloClient from 'apollo-client'

import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Row, Col, Input, Button, message } from 'antd'
import queryString from 'query-string'
import { ApolloConsumer } from 'react-apollo'
import _get from 'lodash/get'

import Divider from '../../components/Divider'

import { getSearchKey, getParsedQS } from '../../utils'
import './style.less'
import { PATH_REGEXP } from '../../constants'
import gql from 'graphql-tag'

import QUERY_ARTICLE from '../../gql/queries/articleId.gql'

type SearchBarProps = {
  placeholder: string
}

type SearchBarState = {
  value: string
}

const QUERY_USER = gql`
  query OSSQueryUser($input: UserInput!) {
    user(input: $input) {
      id
    }
  }
`

class SearchBar extends React.Component<
  RouteComponentProps & SearchBarProps,
  SearchBarState
> {
  state: Readonly<SearchBarState> = { value: getSearchKey() }

  private _onChange = (e: any) => {
    this.setState({ value: e.target.value })
  }

  private async _handleRedirect({
    value,
    client,
  }: {
    value: string
    client: ApolloClient<any>
  }) {
    const { history } = this.props
    const path = value.split('matters.town')[1]

    const isUserLink = PATH_REGEXP.user.test(path)
    if (isUserLink) {
      const userName = path.split('#')[0].split('?')[0].split('@')[1]
      const { data } = await client.query({
        query: QUERY_USER,
        variables: { input: { userName } },
      })
      const userId = _get(data, 'user.id')

      if (userId) {
        history.push(`/users/${userId}`)
      } else {
        message.error('請輸入正確的用戶主頁連結')
      }
    }

    const isArticleLink = PATH_REGEXP.articleDetail.test(path)
    if (isArticleLink) {
      const mediaHash = path.split('#')[0].split('?')[0].split('-').pop()
      const { data } = await client.query({
        query: QUERY_ARTICLE,
        variables: { input: { mediaHash } },
      })
      const articleId = _get(data, 'article.id')

      if (articleId) {
        history.push(`/articles/${articleId}`)
      } else {
        message.error('請輸入正確的文章連結')
      }
    }
    const isShortHashArticleLink = PATH_REGEXP.articleDetailShortHash.test(path)
    if (isShortHashArticleLink) {
      const shortHash = path.split('/a/')[1]
      const { data } = await client.query({
        query: QUERY_ARTICLE,
        variables: { input: { shortHash } },
      })
      const articleId = _get(data, 'article.id')

      if (articleId) {
        history.push(`/articles/${articleId}`)
      } else {
        message.error('請輸入正確的文章連結')
      }
    }
  }

  private _onSearch = async ({
    value,
    client,
  }: {
    value: string
    client: ApolloClient<any>
  }) => {
    if (/http/i.test(value) && /matters\.town/i.test(value)) {
      return await this._handleRedirect({ value, client })
    }

    const { history } = this.props
    const search = queryString.stringify(
      Object.assign(getParsedQS(), {
        q: value,
      })
    )

    this.setState({ value }, () => {
      history.push({ search })
    })
  }

  private _onResetSearch = () => {
    const { history } = this.props
    this.setState({ value: '' }, () => {
      history.push({ search: '' })
    })
  }

  public render() {
    const { placeholder } = this.props
    const { value } = this.state

    return (
      <ApolloConsumer>
        {(client) => (
          <>
            <Row>
              <Col offset={0} span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <section className="c-search-bar">
                  <Input.Search
                    className="input"
                    placeholder={placeholder}
                    value={value}
                    enterButton="搜尋"
                    onChange={this._onChange}
                    onSearch={(value) => this._onSearch({ value, client })}
                  />
                  <Button onClick={this._onResetSearch}>重置</Button>
                </section>
              </Col>
            </Row>

            <Divider size="large" />
          </>
        )}
      </ApolloConsumer>
    )
  }
}

export default withRouter(SearchBar)
