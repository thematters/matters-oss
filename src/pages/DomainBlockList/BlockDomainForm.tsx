import * as React from 'react'
import { Col, Input, Button, message } from 'antd'
import _get from 'lodash/get'
import { Mutation } from 'react-apollo'

import ErrorMessage from '../../components/ErrorMessage'
import { PATH } from '../../constants'
import BLOCK_DOMAIN from '../../gql/mutations/blockDomain.gql'

type BlockDomainFormProps = {}

type BlockDomainFormStates = {
  value: string
  loading: boolean
  error: any
}

class BlockDomainForm extends React.Component<
  BlockDomainFormProps,
  BlockDomainFormStates
> {
  constructor(props: BlockDomainFormProps) {
    super(props)

    this.state = { value: '', loading: false, error: null }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  async handleSubmit(e: any, create: any) {
    e.preventDefault()

    await this.setState({ loading: true, error: false })

    try {
      await create({
        variables: {
          input: {
            type: 'domain',
            value: this.state.value,
          },
        },
      })

      await this.setState({ loading: false, error: false })
      message.success('Blocked.')
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (e) {
      this.setState({ loading: false, error: e })
    }
  }

  handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: e.target.value })
  }

  public render() {
    const { value, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Mutation mutation={BLOCK_DOMAIN}>
        {(create: any) => (
          <form onSubmit={(e) => this.handleSubmit(e, create)}>
            <Col offset={0} span={16} md={{ span: 12 }} lg={{ span: 8 }}>
              <Input
                name="value"
                placeholder="請輸入網域，如：example.com"
                onChange={this.handleChange}
                value={value}
              />
            </Col>

            <Col offset={0} span={8} md={{ span: 12 }} lg={{ span: 8 }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                style={{ marginLeft: 8 }}
              >
                Block
              </Button>
            </Col>
          </form>
        )}
      </Mutation>
    )
  }
}

export default BlockDomainForm
