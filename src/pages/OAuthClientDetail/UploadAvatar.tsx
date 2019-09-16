import * as React from 'react'
import { Alert, Button, Icon, Spin, Upload } from 'antd'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { UPLOAD_FILE_SIZE_LIMIT } from '../../constants'
import ErrorMessage from '../../components/ErrorMessage'

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

type FileUploadProps = {
  avatar: string | null
  onSuccess: ({ id, path }: { id: string; path: string }) => void
}

type FileUploadState = {
  avatar: string | null
  loading: boolean
  warning: string | null
  error: any
}

const spinStyle = {
  marginRight: '8px'
}

const warningStyle = {
  marginTop: '8px'
}

const avatarContainerStyle = {
  borderRadius: '50%',
  marginTop: '16px'
}

class FileUpload extends React.Component<FileUploadProps, FileUploadState> {
  state = {
    avatar: this.props.avatar,
    loading: false,
    warning: null,
    error: null
  }

  private action = async (params: any, upload: any): Promise<any> => {
    const { file } = params

    if (!upload) {
      return
    }
    if (file && file.size > UPLOAD_FILE_SIZE_LIMIT) {
      this.setState(prev => ({ ...prev, warning: '檔案超過 5MB' }))
      return
    }

    this.setState(prev => ({
      ...prev,
      error: null,
      loading: true,
      warning: null
    }))

    try {
      const res = await upload({
        variables: {
          input: {
            file,
            type: 'oauthClientAvatar',
            entityType: 'user'
          }
        }
      })

      const {
        data: {
          singleFileUpload: { id, path }
        }
      } = res

      this.setState(prev => ({
        ...prev,
        loading: false,
        avatar: path,
        error: null
      }))
      this.props.onSuccess({ id, path })
    } catch (error) {
      this.setState(prev => ({ ...prev, error, loading: false }))
    }
  }

  private _onChange = async (params: any) => {
    // TODO: Catch status
  }

  public render() {
    const { avatar, error, loading, warning } = this.state

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
                  上傳並設定 (5MB 內)
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
            {avatar && (
              <div style={avatarContainerStyle}>
                <img style={{ borderRadius: '50%' }} src={avatar} height="80" />
              </div>
            )}
          </>
        )}
      </Mutation>
    )
  }
}

export default FileUpload
