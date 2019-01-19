import * as React from 'react'
import { Layout as AntLayout } from 'antd'

import { STORE_JWT_TOKEN } from '../../../constants'

const Footer: React.FunctionComponent = () => {
  const isAuthenticated = window.localStorage.getItem(STORE_JWT_TOKEN)

  return (
    <AntLayout.Footer style={{ textAlign: 'right' }}>
      © The Matters
      {isAuthenticated && (
        <span style={{ marginLeft: 16, float: 'right' }}>
          <button
            style={{ fontSize: 12 }}
            type="button"
            onClick={() => {
              window.localStorage.removeItem(STORE_JWT_TOKEN)
              window.location.reload()
            }}
          >
            登出
          </button>
        </span>
      )}
    </AntLayout.Footer>
  )
}

export default Footer
