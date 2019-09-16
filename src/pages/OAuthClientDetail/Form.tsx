import * as React from 'react'
import { Form, Input, Button, message } from 'antd'
import _get from 'lodash/get'
import { Mutation } from 'react-apollo'
import { FormComponentProps } from 'antd/es/form'
import gql from 'graphql-tag'

import { OAuthClientDetail } from '../../definitions'
import ErrorMessage from '../../components/ErrorMessage'

type OAuthClientFormProps = FormComponentProps & { data: OAuthClientDetail }

type OAuthClientFormStates = {
  loading: boolean
  error: any
}

const UPDATE_OAUTH_CLIENT = gql`
  mutation UpdateOAuthClient($input: PutOAuthClientInput!) {
    putOAuthClient(input: $input) {
      id
      name
      description
      website
      scope
      avatar
      secret
      redirectURIs
      grantTypes
      user {
        id
      }
    }
  }
`

class OAuthClientForm extends React.Component<
  OAuthClientFormProps,
  OAuthClientFormStates
> {
  constructor(props: OAuthClientFormProps) {
    super(props)

    this.state = { loading: false, error: null }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  normalizeValue = (value: string, toArray?: boolean) => {
    console.log(value)
    if (!value) {
      return null
    }

    if (toArray) {
      return value
        .split('\n')
        .map(v => v.trim())
        .filter(v => !!v)
    }

    return value
  }

  async handleSubmit(e: any, update: any) {
    e.preventDefault()

    await this.setState({ loading: true, error: false })

    try {
      const { getFieldsValue } = this.props.form
      const values = getFieldsValue()

      await update({
        variables: {
          input: {
            id: this.normalizeValue(values.id),
            secret: this.normalizeValue(values.secret),
            name: this.normalizeValue(values.name),
            description: this.normalizeValue(values.description),
            avatar: this.normalizeValue(values.avatar),
            website: this.normalizeValue(values.website),
            user: this.normalizeValue(values.user),
            scope: this.normalizeValue(values.scope, true),
            redirectURIs: this.normalizeValue(values.redirectURIs, true),
            grantTypes: this.normalizeValue(values.grantTypes, true)
          }
        }
      })
      await this.setState({ loading: false, error: false })
      message.success('Updated')
    } catch (e) {
      this.setState({ loading: false, error: e })
    }
  }

  public render() {
    const { loading, error } = this.state
    const { data, form } = this.props
    const { getFieldDecorator } = form

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Mutation mutation={UPDATE_OAUTH_CLIENT}>
        {(update: any) => (
          <Form onSubmit={e => this.handleSubmit(e, update)}>
            <Form.Item label="Client ID">
              {getFieldDecorator('id', {
                initialValue: data.id
              })(<Input disabled />)}
            </Form.Item>

            <Form.Item label="Client Secret" hasFeedback>
              {getFieldDecorator('secret', {
                initialValue: data.secret,
                rules: [
                  {
                    required: true,
                    message: 'required'
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Name" hasFeedback>
              {getFieldDecorator('name', {
                initialValue: data.name,
                rules: [
                  {
                    required: true,
                    message: 'required'
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Description" hasFeedback>
              {getFieldDecorator('description', {
                initialValue: data.description
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Website URL" hasFeedback>
              {getFieldDecorator('website', {
                initialValue: data.website
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Scopes" hasFeedback>
              {getFieldDecorator('scope', {
                initialValue: data.scope ? data.scope.join('\n') : null
              })(<Input.TextArea autosize />)}
            </Form.Item>

            {/*
        <Form.Item label="Avatar" hasFeedback>
          {getFieldDecorator('avatar', {
            initialValue: data.avatar,
          })(<Input />)}
        </Form.Item> */}

            <Form.Item label="Redirect URIs" hasFeedback>
              {getFieldDecorator('redirectURIs', {
                initialValue: data.redirectURIs
                  ? data.redirectURIs.join('\n')
                  : null
              })(<Input.TextArea autosize />)}
            </Form.Item>

            <Form.Item label="Grant Types" hasFeedback>
              {getFieldDecorator('grantTypes', {
                initialValue: data.grantTypes
                  ? data.grantTypes.join('\n')
                  : null
              })(<Input.TextArea autosize />)}
            </Form.Item>

            <Form.Item label="User" hasFeedback>
              {getFieldDecorator('user', {
                initialValue: data.user && data.user.id
              })(<Input />)}
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Update
              </Button>
            </Form.Item>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default Form.create<OAuthClientFormProps>({
  name: 'oauth-client'
})(OAuthClientForm)
