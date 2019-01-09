import React from 'react'
import { Col } from 'antd'

import responsive from './responsive'
import './style.less'

const Description = ({ term, column, children, ...restProps }) => (
  <Col {...responsive[column]} {...restProps}>
    {term && <div className="term">{term}</div>}
    {children !== null && children !== undefined && (
      <div className="detail">{children}</div>
    )}
  </Col>
)

Description.defaultProps = {
  term: ''
}

export default Description
