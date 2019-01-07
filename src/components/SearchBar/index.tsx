import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Row, Col, Input, Button, Divider } from 'antd'
import queryString from 'query-string'

import './style.css'

type SearchBarProps = {
  placeholder: string
}

class SearchBar extends React.Component<RouteComponentProps & SearchBarProps> {
  state = { value: this.qs.q }

  get qs() {
    const { location } = this.props
    return queryString.parse(location.search)
  }

  private _onChange = (e: any) => {
    this.setState({ value: e.target.value })
  }

  private _onSearch = (value: string) => {
    const { history } = this.props

    if (!value) {
      return
    }

    const search = queryString.stringify(
      Object.assign(this.qs, {
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
