import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Row, Col, Input, Button, Divider } from 'antd'
import queryString from 'query-string'

import { getSearchKey, getParsedQS } from '../../utils'
import './style.css'

type SearchBarProps = {
  placeholder: string
}

type SearchBarState = {
  value: string
}

class SearchBar extends React.Component<
  RouteComponentProps & SearchBarProps,
  SearchBarState
> {
  state: Readonly<SearchBarState> = { value: getSearchKey() }

  private _onChange = (e: any) => {
    this.setState({ value: e.target.value })
  }

  private _onSearch = (value: string) => {
    const { history } = this.props
    const search = queryString.stringify(
      Object.assign(getParsedQS(), {
        q: value
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
                onSearch={this._onSearch}
              />
              <Button onClick={this._onResetSearch}>重置</Button>
            </section>
          </Col>
        </Row>
        <Divider />
      </>
    )
  }
}

export default withRouter(SearchBar)
