import * as React from 'react'
import { Button, message } from 'antd'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import ErrorMessage from '../../../components/ErrorMessage'
import { PATH } from '../../../constants'

const PUT_CAMPAIGN = gql`
  mutation AddWritingChallenge($input: PutWritingChallengeInput!) {
    putWritingChallenge(input: $input) {
      id
      shortHash
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

  private action = async (putWritingChallenge: any): Promise<any> => {
    const { history } = this.props

    if (!putWritingChallenge) {
      return
    }

    this.setState((prev) => ({
      ...prev,
      loading: true,
      warning: null,
      error: null,
    }))

    try {
      const result = await putWritingChallenge({
        variables: {
          input: {},
        },
      })

      const shortHash = result?.data?.putWritingChallenge.shortHash
      if (!shortHash) {
        throw new Error('invalid shortHash')
      }

      this.setState(
        (prev) => ({ ...prev, loading: false, error: null }),
        async () => {
          if (this.props.onSuccess) {
            await this.props.onSuccess()
          }
          history.push(PATH.CAMPAIGN_EDIT.replace(':id', shortHash))
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
      <Mutation mutation={PUT_CAMPAIGN}>
        {(putWritingChallenge: any) => (
          <Button
            onClick={() => this.action(putWritingChallenge)}
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
