import * as React from 'react'
import { Divider as AntDivider } from 'antd'

type DividerProps = {
  size?: 'default' | 'large'
  [key: string]: any
}

class Divider extends React.Component<DividerProps> {
  public render() {
    const { size = 'default', children, ...restProps } = this.props
    const style = {}

    if (size === 'large') {
      Object.assign(style, { margin: '24px 0 32px' })
    }

    return (
      <AntDivider style={style} {...restProps}>
        {children}
      </AntDivider>
    )
  }
}

export default Divider
