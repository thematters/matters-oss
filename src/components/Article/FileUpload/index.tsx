import * as React from 'react'
import { Alert, Button, Icon, Spin, Upload } from 'antd'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import { UPLOAD_FILE_SIZE_LIMIT } from '../../../constants'
import ErrorMessage from '../../ErrorMessage'

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

const UPDATE_MATTERS_TODAY = gql`
  mutation UpdateMattersToday($input: UpdateMattersTodayInput!) {
    updateMattersToday(input: $input) {
      id
    }
  }
`

type Props = {
  articleId: string
  cover: string | null
}

type FileUploadState = {
  articleId: string
  cover: string | null
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

const coverContainerStyle = {
  display: 'inline-block',
  border: '1px solid #ddd',
  borderRadius: '3px',
  marginTop: '16px',
  padding: '8px'
}

class FileUpload extends React.Component<Props, FileUploadState> {
  state: Readonly<FileUploadState> = {
    articleId: this.props.articleId,
    cover: this.props.cover,
    loading: false,
    warning: null,
    error: null,
  }

  private action = async (params: any, upload: any, update: any): Promise<any> => {
    const { articleId } = this.state
    const { file, onSuccess, onError } = params
    if (!upload || !update) {
      return undefined
    }
    if (file && file.size > UPLOAD_FILE_SIZE_LIMIT) {
      this.setState(prev => ({ ...prev, warning: '檔案超過 1MB' }))
      return undefined
    }

    this.setState(prev => ({ ...prev, error: null, loading: true, warning: null }))

    let coverPath: string | null = null
    upload({
        variables: { input: { file, type: 'cover' } }
      })
      .then((response: any) => {
        const { data: { singleFileUpload: { id, path } } } = response
        coverPath = path
        return update({
          variables: { input: { id: articleId, cover: id }}
        })
      })
      .then((response: any) => {
        const { data: { updateMattersToday: { id } } } = response
        if (coverPath) {
          this.setState({ articleId: id, cover: coverPath, error: null })
        }
        onSuccess(response, file)
      })
      .catch((error: any) => {
        this.setState(prev => ({ ...prev, error }))
        onError(error, file)
      })
      .finally(() => {
        this.setState(prev => ({ ...prev, loading: false }))
      })
  }

  private _onChange = async(params: any) => {
    // TODO: Catch status
  }

  public render() {
    const { cover, error, loading, warning } = this.state

    if (error) {
      return <ErrorMessage error={error} />
    }

    return (
      <Mutation mutation={UPLOAD_FILE}>
        {upload => (
          <Mutation mutation={UPDATE_MATTERS_TODAY}>
            {update => (
              <>
                <div>
                  <Upload
                    showUploadList={false}
                    customRequest={(params: any) => { this.action(params, upload, update) }}
                    onChange={this._onChange}
                  >
                    <Button>
                      {loading ? <Spin style={spinStyle} size="small"/> : <Icon type="upload"/>}
                      上傳並設定 (1MB 內)
                    </Button>
                  </Upload>
                </div>
                {warning &&
                  <Alert type="warning" message={warning} showIcon={true} style={warningStyle} />
                }
                {cover &&
                  <div style={coverContainerStyle}>
                    <img src={cover} width="220" height="160" />
                  </div>
                }
              </>
            )}
          </Mutation>
        )}
      </Mutation>
    )
  }
}

export default FileUpload
