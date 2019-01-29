import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd'
import { compose } from 'react-apollo'
import queryString from 'query-string'
import _get from 'lodash/get'
import { GraphQLError } from 'graphql'

import withUserLogin, { ChildProps } from './withUserLogin'

import { STORE_JWT_TOKEN, ERROR_CODE } from '../../constants'
import LOGO_URL from '../../assets/logo.svg'
import './style.less'

type LoginState = {
  loading: boolean
}

class Login extends React.Component<ChildProps, LoginState> {
  state = {
    loading: false
  }

  private _renderFormItems() {
    const { loading } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, type: 'email', message: '請輸入郵箱' }]
          })(
            <Input
              size="large"
              prefix={<Icon type="mail" />}
              type="email"
              placeholder="郵箱"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '請輸入密碼' }]
          })(
            <Input
              size="large"
              prefix={<Icon type="lock" />}
              type="password"
              placeholder="密碼"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
            disabled={loading}
            className="login-form-button"
          >
            登入
          </Button>
        </Form.Item>
      </>
    )
  }

  private _onSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const { form, mutate } = this.props
    const { getFieldValue, validateFields, setFields } = form
    const {
      query: { next }
    } = queryString.parseUrl(window.location.href)

    validateFields(async (err, values) => {
      if (err) {
        return
      }
      try {
        const email = getFieldValue('email')
        const password = getFieldValue('password')
        this.setState({ loading: true })
        const result = await mutate({
          variables: {
            input: {
              email,
              password
            }
          }
        })
        const token = _get(result, 'data.userLogin.token')
        if (token) {
          localStorage.setItem(STORE_JWT_TOKEN, token)
          window.location.replace((next as string) || '/')
        } else {
          setFields({
            email: {
              value: email,
              errors: [new Error('郵箱或密碼有誤')]
            }
          })
        }
        this.setState({ loading: false })
      } catch (e) {
        if (e.graphQLErrors) {
          const errors: ReadonlyArray<GraphQLError> = e.graphQLErrors
          errors.map(({ extensions }) => {
            const code = _get(extensions, 'code')
            switch (code) {
              case ERROR_CODE.USER_EMAIL_NOT_FOUND:
                setFields({
                  email: {
                    errors: [new Error('郵箱不存在')]
                  }
                })
                break
              case ERROR_CODE.USER_PASSWORD_INVALID:
                setFields({
                  email: {
                    errors: [new Error('密碼有誤')]
                  }
                })
                break
              default:
                setFields({
                  email: {
                    errors: [new Error('登入失敗')]
                  }
                })
                break
            }
          })
        } else {
          setFields({
            email: {
              errors: [new Error('登入失敗')]
            }
          })
        }
        this.setState({ loading: false })
      }
    })
  }

  public render() {
    return (
      <Row
        type="flex"
        align="middle"
        style={{ height: 'calc(100vh - 69px)', margin: '0 24px' }}
      >
        <Col
          offset={0}
          span={24}
          md={{ offset: 6, span: 12 }}
          lg={{ offset: 9, span: 6 }}
        >
          <div
            className="logo"
            style={{ marginBottom: 24, textAlign: 'center' }}
          >
            <img src={LOGO_URL} />
            <strong>&nbsp; Matters OSS</strong>
          </div>
          <Form onSubmit={this._onSubmit} className="c-login-form">
            {this._renderFormItems()}
          </Form>
        </Col>
      </Row>
    )
  }
}

export default compose(
  withUserLogin,
  Form.create()
)(Login)
