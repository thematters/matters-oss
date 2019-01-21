import * as React from 'react'
import { Link } from 'react-router-dom'
import { Tag } from 'antd'

import { PATH } from '../../../constants'

type TagLinkProps = {
  id: string
  content: string
}

const TagLink: React.FunctionComponent<TagLinkProps> = ({ id, content }) => (
  <Link to={PATH.TAG_DETAIL.replace(':id', id)}>
    <Tag>{content}</Tag>
  </Link>
)

export default TagLink
