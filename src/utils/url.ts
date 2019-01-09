import queryString from 'query-string'

export const getSearchKey = () => {
  const { query } = queryString.parseUrl(window.location.href)
  return (query.q as string) || ''
}

export const getParsedQS = () => {
  const { query } = queryString.parseUrl(window.location.href)
  return query
}
