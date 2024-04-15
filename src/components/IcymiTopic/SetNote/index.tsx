import * as React from 'react'
import { Input, Button } from 'antd'
import _get from 'lodash/get'

import ErrorMessage from '../../ErrorMessage'
import withSetNote, { ChildProps } from './withSetNote'

type SetNoteState = {
  note: string
  loading: boolean
  error: any
}

class SetNote extends React.Component<ChildProps, SetNoteState> {
  state: Readonly<SetNoteState> = {
    note: this.props.note,
    loading: false,
    error: null,
  }

  private _onSubmit = async () => {
    this.setState({ loading: true, error: null })

    const { mutate, id } = this.props

    try {
      await mutate({
        variables: {
          input: {
            id,
            note: this.state.note,
          },
        },
      })
      this.setState({ loading: false, error: null })
    } catch (error) {
      this.setState({ loading: false, error })
    }
  }

  private _onChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({ note: event.target.value })
  }

  public render() {
    const { note, loading, error } = this.state
    const changed = this.props.note !== note

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <>
        <Input.TextArea
          onChange={this._onChange}
          value={note}
          maxLength={255}
          autosize={{ minRows: 2 }}
          style={{ margin: '4px', verticalAlign: 'middle' }}
        />
        <div style={{ textAlign: 'right' }}>
          <Button
            onClick={this._onSubmit}
            type="primary"
            size="small"
            loading={loading}
            disabled={!changed}
            style={{
              fontSize: 12,
              verticalAlign: 'middle',
              opacity: changed ? 1 : 0,
            }}
          >
            保存
          </Button>
        </div>
      </>
    )
  }
}

export default withSetNote(SetNote)
