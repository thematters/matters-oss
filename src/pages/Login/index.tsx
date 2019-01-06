import * as React from 'react'
import { Form, Icon, Input, Button, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form'
import { ChildProps } from 'react-apollo'
import queryString from 'query-string'
import _get from 'lodash/get'

import withUserLogin, { Response } from './withUserLogin'

import { STORE_JWT_TOKEN } from '../../constants'
import LOGO_URL from '../../assets/logo.svg'
import './Login.css'

interface LoginProps extends FormComponentProps, ChildProps<any, Response> {}

class Login extends React.Component<LoginProps, any> {
  private _renderFormItems() {
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
        const { data } = await mutate({
          variables: {
            input: {
              email,
              password
            }
          }
        })
        const token = _get(data, 'userLogin.token')
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
      } catch (e) {
        setFields({
          email: {
            errors: [new Error('登入失敗')]
          }
        })
      }
    })
  }

  public render() {
    return (
      <Row style={{ marginTop: 100 }}>
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

// @ts-ignore
const WrappedLogin = withUserLogin(Form.create()(Login))

export default WrappedLogin
