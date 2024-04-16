import { Base64 } from 'js-base64'

type NODE_TYPES = 'Article' | 'Draft' | 'User'

export const toGlobalId = ({
  type,
  id,
}: {
  type: NODE_TYPES
  id: number | string
}) => Base64.encodeURI(`${type}:${id}`)
