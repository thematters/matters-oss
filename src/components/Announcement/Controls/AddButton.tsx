import * as React from 'react'
import { Button, message } from 'antd'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import ErrorMessage from '../../../components/ErrorMessage'

const PUT_ANNOUNCEMENT = gql`
  mutation AddAnnouncement($input: PutAnnouncementInput!) {
    putAnnouncement(input: $input) {
      id
      __typename
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

  private action = async (putAnnouncement: any): Promise<any> => {
    const { history } = this.props

    if (!putAnnouncement) {
      return
    }

    this.setState((prev) => ({
      ...prev,
      loading: true,
      warning: null,
      error: null,
    }))

    try {
      const result = await putAnnouncement({
        variables: {
          input: {
            type: 'community',
          },
        },
      })

      const announcementId = result?.data?.putAnnouncement.id
      if (!announcementId) {
        throw new Error('invalid id')
      }

      this.setState(
        (prev) => ({ ...prev, loading: false, error: null }),
        async () => {
          if (this.props.onSuccess) {
            await this.props.onSuccess()
          }
          history.push(`/announcement/${announcementId}`)
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
    const { loading, warning, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Mutation mutation={PUT_ANNOUNCEMENT}>
        {(putAnnouncement: any) => (
          <Button
            onClick={() => this.action(putAnnouncement)}
            disabled={loading}
          >
            新增
          </Button>
        )}
      </Mutation>
    )
  }
}

export default withRouter(AddButton)
