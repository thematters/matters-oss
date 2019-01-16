import * as React from 'react'
import { Layout as AntLayout } from 'antd'

const Content: React.FunctionComponent = ({ children }) => (
  <AntLayout.Content style={{ padding: 24, margin: 24, background: '#fff' }}>
    {children}
  </AntLayout.Content>
)

export default Content
