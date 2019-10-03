import * as React from 'react'
import { Col, Input, Button, message } from 'antd'
import _get from 'lodash/get'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import ErrorMessage from '../../components/ErrorMessage'
import { PATH } from '../../constants'

type CreateOAuthClientFormProps = {}

type CreateOAuthClientFormStates = {
  name: string
  loading: boolean
  error: any
}

const CREATE_OAUTH_CLIENT = gql`
  mutation CreateOAuthClient($input: PutOAuthClientInput!) {
    putOAuthClient(input: $input) {
      id
    }
  }
`

class CreateOAuthClientForm extends React.Component<
  CreateOAuthClientFormProps,
  CreateOAuthClientFormStates
> {
  constructor(props: CreateOAuthClientFormProps) {
    super(props)

    this.state = { name: '', loading: false, error: null }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(e: any, create: any) {
    e.preventDefault()

    await this.setState({ loading: true, error: false })

    try {
      const res = await create({
        variables: {
          input: {
            name: this.state.name
          }
        }
      })

      const {
        data: {
          putOAuthClient: { id }
        }
      } = res

      await this.setState({ loading: false, error: false })
      message.success('Created')
      window.location.href = PATH.OAUTH_CLIENT_DETAIL.replace(':id', id)
    } catch (e) {
      this.setState({ loading: false, error: e })
    }
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ name: e.target.value })
  }

  public render() {
    const { name, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Mutation mutation={CREATE_OAUTH_CLIENT}>
        {(create: any) => (
          <form onSubmit={e => this.handleSubmit(e, create)}>
            <Col offset={0} span={16} md={{ span: 12 }} lg={{ span: 8 }}>
              <Input
                name="name"
                placeholder="Name"
                onChange={this.handleChange}
                value={name}
              />
            </Col>

            <Col offset={0} span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginLeft: 8 }}
              >
                Create
              </Button>
            </Col>
          </form>
        )}
      </Mutation>
    )
  }
}

export default CreateOAuthClientForm
