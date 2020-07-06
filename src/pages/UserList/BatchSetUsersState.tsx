import * as React from 'react'
import { Col, Input, Row, message } from 'antd'
import _get from 'lodash/get'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import isEmail from 'validator/lib/isEmail'

import ErrorMessage from '../../components/ErrorMessage'
import UserSetState from '../../components/User/SetState'

type BatchSetUsersStateProps = {}

type BatchSetUsersStateStates = {
  value: string
  loading: boolean
  error: any
}

const BLOCK_DOMAIN = gql`
  mutation BlockDomain($input: PutSkippedListItemInput!) {
    putSkippedListItem(input: $input) {
      id
    }
  }
`

class BatchSetUsersState extends React.Component<
  BatchSetUsersStateProps,
  BatchSetUsersStateStates
> {
  constructor(props: BatchSetUsersStateProps) {
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

  handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    this.setState({ value: e.target.value })
  }

  public render() {
    const { value, loading, error } = this.state
    const emails = value
      .split('\n')
      .map((e) => e.trim())
      .filter((e) => !!e && isEmail(e))

    console.log(emails)

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Row style={{ paddingBottom: '1rem' }}>
        <Mutation mutation={BLOCK_DOMAIN}>
          {(create: any) => (
            <form onSubmit={(e) => this.handleSubmit(e, create)}>
              <Col
                offset={0}
                span={16}
                md={{ span: 12 }}
                lg={{ span: 8 }}
                style={{ paddingRight: 12 }}
              >
                <Input.TextArea
                  name="value"
                  placeholder="user1@example.com&#10;user2@example.com&#10;user3@example.com&#10;user4@example.com"
                  onChange={this.handleChange}
                  value={value}
                />
              </Col>

              <Col offset={0} span={8} md={{ span: 4 }} lg={{ span: 2 }}>
                <UserSetState
                  emails={emails}
                  state="active"
                  disabled={emails.length <= 0}
                  batch
                />
              </Col>
            </form>
          )}
        </Mutation>
      </Row>
    )
  }
}

export default BatchSetUsersState
