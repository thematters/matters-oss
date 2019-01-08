import * as React from 'react'
import { Alert, message } from 'antd'

type ErrorMessageProps = {
  error: any
  message?: string
}

class ErrorMessage extends React.Component<ErrorMessageProps> {
  public render() {
    const { error, message = '請求錯誤' } = this.props

    return (
      <Alert
        message={message}
        description={
          <pre
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(error, null, 4)
            }}
          />
        }
        type="error"
        showIcon
      />
    )
  }
}

export default ErrorMessage
