import { Base64 } from 'js-base64'

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
