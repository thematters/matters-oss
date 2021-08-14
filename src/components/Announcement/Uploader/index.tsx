import * as React from 'react'
import { Alert, Button, Icon, Spin, Upload } from 'antd'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import ErrorMessage from '../../../components/ErrorMessage'

const UPLOAD_FILE = gql`
  mutation SingleFileUpload($input: SingleFileUploadInput!) {
    singleFileUpload(input: $input) {
      ... on Asset {
        id
        path
      }
    }
  }
`

type Props = {
  announcementId: string
  cover: string | null
  onSuccess: ({ id, path }: { id: string; path: string }) => void
}

type State = {
  cover: string | null
  loading: boolean
  warning: string | null
  error: any
}

const spinStyle = {
  marginRight: '8px',
}

const warningStyle = {
  marginTop: '8px',
}

const coverContainerStyle = {
  borderRadius: '50%',
  marginTop: '16px',
}

class Uploader extends React.Component<Props, State> {
  state = {
    cover: this.props.cover,
    loading: false,
    warning: null,
    error: null,
  }

  private action = async (params: any, upload: any): Promise<any> => {
    const { file } = params

    if (!upload) {
      return
    }

    this.setState((prev) => ({
      ...prev,
      error: null,
      loading: true,
      warning: null,
    }))

    try {
      const result = await upload({
        variables: {
          input: {
            file,
            type: 'announcementCover',
            entityType: 'announcement',
            entityId: this.props.announcementId,
          },
        },
      })

      const {
        data: {
          singleFileUpload: { id, path },
        },
      } = result

      this.setState((prev) => ({
        ...prev,
        cover: path,
        loading: false,
        error: null,
      }))
      this.props.onSuccess({ id, path })
    } catch (error) {
      this.setState((prev) => ({ ...prev, error, loading: false }))
    }
  }

  private _onChange = async (params: any) => {
    // TODO: Catch status
  }

  public render() {
    const { cover, error, loading, warning } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Mutation mutation={UPLOAD_FILE}>
        {(upload: any) => (
          <>
            <div>
              <Upload
                showUploadList={false}
                customRequest={(params: any) => {
                  this.action(params, upload)
                }}
                onChange={this._onChange}
              >
                <Button>
                  {loading ? (
                    <Spin style={spinStyle} size="small" />
                  ) : (
                    <Icon type="upload" />
                  )}
                  上傳
                </Button>
              </Upload>
            </div>
            {warning && (
              <Alert
                type="warning"
                message={warning}
                showIcon={true}
                style={warningStyle}
              />
            )}
            {cover && (
              <div style={coverContainerStyle}>
                <img style={{ borderRadius: '1rem' }} src={cover} width="100%" height="100" />
              </div>
            )}
          </>
        )}
      </Mutation>
    )
  }
}

export default Uploader
