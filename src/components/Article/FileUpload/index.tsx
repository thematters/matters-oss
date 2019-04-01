import * as React from 'react'
import { Button, Icon, Upload } from 'antd'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

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
  error: boolean
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
    error: false
  }

  private action = async (params: any, upload: any, update: any): Promise<any> => {
    const { articleId } = this.state
    const { file, onSuccess, onError } = params
    if (!upload || !update) {
      return undefined
    }

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
          this.setState({ articleId: id, cover: coverPath, error: false })
        }
        onSuccess(response, file)
      })
      .catch((error: any) => {
        this.setState(prev => ({ ...prev, error: true }))
        onError(error, file)
      })
  }

  private _onChange = async(params: any) => {
    // TODO: Catch status
  }

  public render() {
    const { cover, error } = this.state

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
                      <Icon type="upload"/> 上傳
                    </Button>
                  </Upload>
                </div>
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
