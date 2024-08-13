import * as React from 'react'
import { Radio } from 'antd'

import ErrorMessage from '../../ErrorMessage'
import withMarkSpam, { ChildProps } from './withMarkSpam'

type MarkSpamState = {
  isSpam: boolean | null
  loading: boolean
  error: any
}

class MarkSpam extends React.Component<ChildProps, MarkSpamState> {
  state: Readonly<MarkSpamState> = {
    isSpam: this.props.isSpam,
    loading: false,
    error: null,
  }

  private _onChange = async (event: any) => {
    this.setState({ loading: true, error: null })

    const { mutate, articleId } = this.props
    const isSpam = event.target.value === '1' ? true : false
    try {
      await mutate({
        variables: {
          input: {
            id: articleId,
            isSpam,
          },
        },
      })
      this.setState({
        isSpam,
        loading: false,
        error: null,
      })
    } catch (error) {
      this.setState({ loading: false, error })
    }
    this.setState({ loading: false, error: null })
  }

  public render() {
    const { isSpam, loading, error } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    const defaultValue = isSpam === null ? 'null' : isSpam ? '1' : '0'

    return (
      <Radio.Group
        onChange={this._onChange}
        defaultValue={defaultValue}
        buttonStyle="solid"
        size="small"
        disabled={loading}
      >
        <Radio.Button value="1">是</Radio.Button>
        <Radio.Button value="0">否</Radio.Button>
      </Radio.Group>
    )
  }
}

export default withMarkSpam(MarkSpam)
