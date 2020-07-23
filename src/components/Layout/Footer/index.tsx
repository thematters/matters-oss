import * as React from 'react'
import { Layout as AntLayout } from 'antd'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import { ViewerContext } from '../ViewerProvider'

const ADMIN_LOGOUT = gql`
  mutation UserLogout {
    userLogout
  }
`

const Footer: React.FC = () => {
  const viewer = React.useContext(ViewerContext)

  return (
    <Mutation mutation={ADMIN_LOGOUT}>
      {(logout: any) => (
        <AntLayout.Footer style={{ textAlign: 'right' }}>
          © The Matters
          {viewer.isAuthed && (
            <span style={{ marginLeft: 16, float: 'right' }}>
              <button
                style={{ fontSize: 12 }}
                type="button"
                onClick={async () => {
                  await logout()
                  window.location.reload()
                }}
              >
                登出
              </button>
            </span>
          )}
        </AntLayout.Footer>
      )}
    </Mutation>
  )
}

export default Footer
