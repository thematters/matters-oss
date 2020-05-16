import * as React from 'react'
import { Link } from 'react-router-dom'
import _truncate from 'lodash/truncate'

import { stripHtml } from '../../../utils'
import { PATH } from '../../../constants'

type CommentLinkProps = {
  id: string
  content: string
}

const CommentLink: React.FunctionComponent<CommentLinkProps> = ({
  id,
  content,
}) => {
  return (
    <Link to={PATH.COMMENT_DETAIL.replace(':id', id)}>
      {_truncate(stripHtml(content))}
    </Link>
  )
}

export default CommentLink
