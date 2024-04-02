import * as React from 'react'
import { Button, message } from 'antd'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import ErrorMessage from '../../components/ErrorMessage'

const ADD_ICYMITOPIC = gql`
  mutation AddIcymiTopic($input: PutIcymiTopicInput!) {
    putIcymiTopic(input: $input) {
      id
    }
  }
`

type Props = RouteComponentProps & { onSuccess: any }

type State = {
  loading: boolean
  warning: string | null
  error: any
}

class AddButton extends React.Component<Props, State> {
  state = {
    loading: false,
    warning: null,
    error: null,
  }

  private action = async (addIcymiTopic: any): Promise<any> => {
    const { history } = this.props

    if (!addIcymiTopic) {
      return
    }

    this.setState((prev) => ({
      ...prev,
      loading: true,
      warning: null,
      error: null,
    }))

    try {
      const result = await addIcymiTopic({
        variables: {
          input: { title: '新建精选', pinAmount: 3 },
        },
      })

      const icymiTopicId = result?.data?.putIcymiTopic.id
      if (!icymiTopicId) {
        throw new Error('invalid id')
      }

      this.setState(
        (prev) => ({ ...prev, loading: false, error: null }),
        async () => {
          if (this.props.onSuccess) {
            await this.props.onSuccess()
          }
          history.push(`/homepage/icymi_topic/${icymiTopicId}`)
        }
      )
    } catch (error) {
      this.setState(
        (prev) => ({ ...prev, loading: false, error }),
        () => message.error('新增失敗')
      )
    }
  }

  public render() {
    const { loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Mutation mutation={ADD_ICYMITOPIC}>
        {(addIcymiTopic: any) => (
          <Button onClick={() => this.action(addIcymiTopic)} disabled={loading}>
            新增
          </Button>
        )}
      </Mutation>
    )
  }
}

export default withRouter(AddButton)
