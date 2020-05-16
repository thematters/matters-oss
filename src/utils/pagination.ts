import { Base64 } from 'js-base64'
import jump from 'jump.js'
import _get from 'lodash/get'

import { PAGE_SIZE } from '../constants'
import { getParsedQS, setQS } from './url'

const PREFIX = 'arrayconnection'

export type ConnectionCursor = string

export const cursorToIndex = (cursor: ConnectionCursor | undefined): number => {
  return cursor ? parseInt(Base64.decode(cursor).split(':')[1], 10) : -1
}

export const indexToCursor = (index: number): ConnectionCursor => {
  return Base64.encodeURI(`${PREFIX}:${index}`)
}

export const pageToCursor = (
  page: number,
  pageSize: number
): ConnectionCursor => {
  const index = (page - 1) * pageSize - 1
  return indexToCursor(index)
}

export const onPaginationChange = ({
  page,
  pagination,
}: {
  page: number
  pagination: {
    totalCount: number
    fetchMore?: any
    variables?: any
  }
}) => {
  if (!pagination) {
    return
  }

  const cursor = pageToCursor(
    page,
    _get(pagination, 'variables.input.first', PAGE_SIZE)
  )

  setQS({ page, after: cursor })
  jump('body')

  pagination.fetchMore({
    variables: {
      input: {
        ...pagination.variables.input,
        after: cursor,
      },
    },
    updateQuery: (_: any, { fetchMoreResult }: any) => fetchMoreResult,
  })
}

export const getCurrentPaginationFromUrl = (pageSize = PAGE_SIZE) => {
  const { page, after } = getParsedQS()

  if (!page || !after) {
    return
  }

  return { page: parseInt(page as string, 10), after: after as string }
}
