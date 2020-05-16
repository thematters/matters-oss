import * as React from 'react'
import { Link } from 'react-router-dom'

import { PATH } from '../../../constants'

type ArticleLinkProps = {
  id: string
  title: string
}

const ArticleLink: React.FunctionComponent<ArticleLinkProps> = ({
  id,
  title,
}) => {
  return <Link to={PATH.ARTICLE_DETAIL.replace(':id', id)}>{title}</Link>
}

export default ArticleLink
