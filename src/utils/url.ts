import queryString from 'query-string'

export const getSearchKey = () => {
  const { query } = queryString.parseUrl(window.location.href)
  return (query.q as string) || ''
}

export const getParsedQS = () => {
  const { query } = queryString.parseUrl(window.location.href)
  return query
}

export const setQS = (qs: { [key: string]: any }) => {
  const query = queryString.stringify(qs)
  if (history.pushState) {
    let newurl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname +
      '?' +
      query
    window.history.pushState({ path: newurl }, '', newurl)
    return
  }

  location.search = query
}
