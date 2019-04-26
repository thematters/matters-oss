import queryString from 'query-string'

export const getParsedQS = () => {
  const { query } = queryString.parseUrl(window.location.href)
  return query
}

export const getSearchKey = () => {
  const query = getParsedQS()
  return (query.q as string) || ''
}

export const getSortKey = () => {
  const query = getParsedQS()
  return (query.sort as string) || undefined
}

export const setQS = (qs: { [key: string]: any }) => {
  const currentQs = getParsedQS()
  const query = queryString.stringify({ ...currentQs, ...qs })

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
